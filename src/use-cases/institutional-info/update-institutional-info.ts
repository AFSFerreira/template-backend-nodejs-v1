import type {
  UpdateInstitutionalInfoUseCaseRequest,
  UpdateInstitutionalInfoUseCaseResponse,
} from '@custom-types/use-cases/institutional-info/update-institutional-info'
import type { DatabaseContext } from '@lib/prisma/helpers/database-context'
import type { Prisma } from '@prisma/client'
import type { InstitutionalInfoRepository } from '@repositories/institutional-info-repository'
import type { JSONContent } from '@tiptap/core'
import { tiptapConfiguration } from '@lib/tiptap/helpers/configuration'
import { tokens } from '@lib/tsyringe/helpers/tokens'
import {
  buildInstitutionalAboutImagePath,
  buildInstitutionalTempAboutImagePath,
} from '@services/builders/paths/build-institutional-about-image-path'
import { buildElectionNoticeUrl } from '@services/builders/urls/build-election-notice-url'
import { buildInstitutionalAboutImageUrl } from '@services/builders/urls/build-institutional-about-image-url'
import { buildStatuteUrl } from '@services/builders/urls/build-statute-url'
import { persistFile } from '@services/files/persist-file'
import { generateText } from '@tiptap/core'
import { InvalidProseMirrorError } from '@use-cases/errors/generic/invalid-prose-mirror-error'
import { InstitutionalInfoImageStorageError } from '@use-cases/errors/institutional-info/institutional-info-image-storage-error'
import { InstitutionalInfoNotFoundError } from '@use-cases/errors/institutional-info/institutional-info-not-found-error'
import { deleteFile } from '@utils/files/delete-file'
import { ensureExists } from '@utils/validators/ensure'
import { inject, injectable } from 'tsyringe'

@injectable()
export class UpdateInstitutionalInfoUseCase {
  constructor(
    @inject(tokens.repositories.institutionalInfo)
    private readonly institutionalInfoRepository: InstitutionalInfoRepository,

    @inject(tokens.infra.database)
    private readonly dbContext: DatabaseContext,
  ) {}

  async execute({ data }: UpdateInstitutionalInfoUseCaseRequest): Promise<UpdateInstitutionalInfoUseCaseResponse> {
    const updateData: Prisma.InstitutionalInfoUpdateInput = {}

    try {
      if (data.aboutImage) {
        ensureExists({
          value: await persistFile({
            oldFilePath: buildInstitutionalTempAboutImagePath(data.aboutImage),
            newFilePath: buildInstitutionalAboutImagePath(data.aboutImage),
          }),
          error: new InstitutionalInfoImageStorageError(),
        })

        updateData.aboutImage = data.aboutImage
      }

      const { institutionalInfo } = await this.dbContext.runInTransaction(async () => {
        const currentInstitutionalInfo = ensureExists({
          value: await this.institutionalInfoRepository.getInstitutionalInfo(),
          error: new InstitutionalInfoNotFoundError(),
        })

        if (data.aboutDescription) {
          // Tenta compilar o prose mirror para validar o formato:
          try {
            generateText(data.aboutDescription as JSONContent, tiptapConfiguration)
          } catch (_error) {
            throw new InvalidProseMirrorError()
          }

          updateData.aboutDescription = data.aboutDescription as Prisma.InputJsonValue
        }

        const shouldUpdate = Object.keys(updateData).length > 0

        const updatedInstitutionalInfo = shouldUpdate
          ? await this.institutionalInfoRepository.update({
              id: currentInstitutionalInfo.id,
              data: updateData,
            })
          : currentInstitutionalInfo

        return { institutionalInfo: updatedInstitutionalInfo }
      })

      return {
        institutionalInfo: {
          ...institutionalInfo,
          electionNoticeFile: buildElectionNoticeUrl(institutionalInfo.electionNoticeFile),
          statuteFile: buildStatuteUrl(institutionalInfo.statuteFile),
          aboutImage: buildInstitutionalAboutImageUrl(institutionalInfo.aboutImage),
        },
      }
    } catch (error) {
      if (data.aboutImage) {
        await deleteFile(buildInstitutionalAboutImagePath(data.aboutImage))
      }

      throw error
    }
  }
}
