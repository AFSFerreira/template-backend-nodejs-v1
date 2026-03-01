import type { UpdateInstitutionalInfoQuery } from '@custom-types/repository/prisma/institutional-info/update-institutional-info-query'
import type {
  UpdateInstitutionalInfoUseCaseRequest,
  UpdateInstitutionalInfoUseCaseResponse,
} from '@custom-types/use-cases/institutional-info/update-institutional-info'
import type { Prisma } from '@prisma/generated/client'
import type { InstitutionalInfoRepository } from '@repositories/institutional-info-repository'
import type { JSONContent } from '@tiptap/core'
import { moveFileEnqueued } from '@jobs/queues/facades/file-queue-facade'
import { redis } from '@lib/redis'
import { tiptapConfiguration } from '@lib/tiptap/helpers/configuration'
import { tsyringeTokens } from '@lib/tsyringe/helpers/tokens'
import {
  buildInstitutionalAboutImagePath,
  buildInstitutionalTempAboutImagePath,
} from '@services/builders/paths/build-institutional-about-image-path'
import { buildElectionNoticeUrl } from '@services/builders/urls/build-election-notice-url'
import { buildInstitutionalAboutImageUrl } from '@services/builders/urls/build-institutional-about-image-url'
import { buildStatuteUrl } from '@services/builders/urls/build-statute-url'
import { removeInstitutionalInfoHTMLCache } from '@services/cache/institutional-info-html-cache'
import { generateText } from '@tiptap/core'
import { InvalidProseMirrorError } from '@use-cases/errors/generic/invalid-prose-mirror-error'
import { InstitutionalInfoNotFoundError } from '@use-cases/errors/institutional-info/institutional-info-not-found-error'
import { sanitizeUrlFilename } from '@utils/formatters/sanitize-url-filename'
import { ensureExists } from '@utils/validators/ensure'
import { inject, injectable } from 'tsyringe'

@injectable()
export class UpdateInstitutionalInfoUseCase {
  constructor(
    @inject(tsyringeTokens.repositories.institutionalInfo)
    private readonly institutionalInfoRepository: InstitutionalInfoRepository,
  ) {}

  async execute({ data }: UpdateInstitutionalInfoUseCaseRequest): Promise<UpdateInstitutionalInfoUseCaseResponse> {
    const updateData: UpdateInstitutionalInfoQuery['data'] = {}

    let newAboutImage: string | undefined

    if (data.aboutDescription) {
      // Tenta compilar o prose mirror para validar o formato:
      try {
        generateText(data.aboutDescription as JSONContent, tiptapConfiguration)
      } catch (_error) {
        throw new InvalidProseMirrorError()
      }

      updateData.aboutDescription = data.aboutDescription as Prisma.InputJsonValue
    }

    const currentInstitutionalInfo = ensureExists({
      value: await this.institutionalInfoRepository.getInstitutionalInfo(),
      error: new InstitutionalInfoNotFoundError(),
    })

    if (data.aboutImage) {
      const aboutImageSanitized = sanitizeUrlFilename(data.aboutImage)

      newAboutImage =
        aboutImageSanitized && aboutImageSanitized !== currentInstitutionalInfo.aboutImage
          ? aboutImageSanitized
          : undefined

      if (newAboutImage) {
        updateData.aboutImage = newAboutImage
      }
    }

    const shouldUpdate = Object.keys(updateData).length > 0

    const institutionalInfo = shouldUpdate
      ? await this.institutionalInfoRepository.update({
          id: currentInstitutionalInfo.id,
          data: updateData,
        })
      : currentInstitutionalInfo

    const institutionalAboutImagePaths = newAboutImage
      ? {
          oldFilePath: buildInstitutionalTempAboutImagePath(newAboutImage),
          newFilePath: buildInstitutionalAboutImagePath(newAboutImage),
        }
      : undefined

    if (institutionalAboutImagePaths) {
      await moveFileEnqueued(institutionalAboutImagePaths)
    }

    await removeInstitutionalInfoHTMLCache({ redis })

    return {
      institutionalInfo: {
        ...institutionalInfo,
        electionNoticeFile: buildElectionNoticeUrl(institutionalInfo.electionNoticeFile),
        statuteFile: buildStatuteUrl(institutionalInfo.statuteFile),
        aboutImage: buildInstitutionalAboutImageUrl(institutionalInfo.aboutImage),
      },
    }
  }
}
