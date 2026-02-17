import type {
  UpdateNewsletterUseCaseRequest,
  UpdateNewsletterUseCaseResponse,
} from '@custom-types/use-cases/newsletters/update-newsletter'
import type { DatabaseContext } from '@lib/prisma/helpers/database-context'
import type { Prisma } from '@prisma/generated/client'
import type { NewslettersRepository } from '@repositories/newsletters-repository'
import { deleteFileEnqueued, moveFileEnqueued } from '@jobs/queues/facades/file-queue-facade'
import { logger } from '@lib/logger'
import { tsyringeTokens } from '@lib/tsyringe/helpers/tokens'
import { NEWSLETTER_UPDATED_SUCCESSFULLY } from '@messages/loggings/models/newsletter-loggings'
import {
  buildNewsletterHtmlPath,
  buildNewsletterTempHtmlPath,
} from '@services/builders/paths/build-newsletter-html-path'
import { buildNewsletterHtmlUrl } from '@services/builders/urls/build-newsletter-html-url'
import { NewsletterAlreadyExistsError } from '@use-cases/errors/newsletter/newsletter-already-exists-error'
import { NewsletterNotFoundError } from '@use-cases/errors/newsletter/newsletter-not-found-error'
import { sanitizeUrlFilename } from '@utils/formatters/sanitize-url-filename'
import { ensureExists } from '@utils/validators/ensure'
import { inject, injectable } from 'tsyringe'

@injectable()
export class UpdateNewsletterUseCase {
  constructor(
    @inject(tsyringeTokens.repositories.newsletters)
    private readonly newslettersRepository: NewslettersRepository,

    @inject(tsyringeTokens.infra.database)
    private readonly dbContext: DatabaseContext,
  ) {}

  async execute({ publicId, body }: UpdateNewsletterUseCaseRequest): Promise<UpdateNewsletterUseCaseResponse> {
    const updateData: Prisma.NewsletterUpdateInput = {}

    let newContentFilename: string | undefined

    const { newsletter } = await this.dbContext.runInTransaction(async () => {
      const newsletter = ensureExists({
        value: await this.newslettersRepository.findByPublicId(publicId),
        error: new NewsletterNotFoundError(),
      })

      if (body.sequenceNumber || body.editionNumber || body.volume) {
        const sequenceNumber = body.sequenceNumber ?? newsletter.sequenceNumber
        const editionNumber = body.editionNumber ?? newsletter.editionNumber
        const volume = body.volume ?? newsletter.volume

        // Verifica se já existe uma newsletter com os mesmos dados (exceto a atual):
        const conflictingNewsletter = await this.newslettersRepository.findConflictingNewsletter({
          ...(editionNumber && volume
            ? {
                editionNumber_volume: {
                  editionNumber,
                  volume,
                },
              }
            : {}),
          sequenceNumber,
        })

        if (conflictingNewsletter && conflictingNewsletter.id !== newsletter.id) {
          throw new NewsletterAlreadyExistsError()
        }

        if (body.contentFilename) {
          const filenameSanitized = sanitizeUrlFilename(body.contentFilename)

          newContentFilename =
            filenameSanitized && filenameSanitized !== newsletter.content ? filenameSanitized : undefined
        }

        if (newContentFilename) {
          updateData.content = newContentFilename
        }

        if (body.sequenceNumber) {
          updateData.sequenceNumber = body.sequenceNumber
        }

        if (body.editionNumber) {
          updateData.editionNumber = body.editionNumber
        }

        if (body.volume) {
          updateData.volume = body.volume
        }
      }

      const shouldUpdate = Object.keys(updateData).length > 0

      const updatedNewsletter = shouldUpdate
        ? await this.newslettersRepository.update({
            id: newsletter.id,
            data: updateData,
          })
        : newsletter

      return { newsletter: updatedNewsletter }
    })

    const newsletterHtmlPaths = newContentFilename
      ? {
          oldFilePath: buildNewsletterTempHtmlPath(newContentFilename),
          newFilePath: buildNewsletterHtmlPath(newContentFilename),
        }
      : undefined

    if (newsletterHtmlPaths) {
      await moveFileEnqueued(newsletterHtmlPaths)

      await deleteFileEnqueued({
        filePath: buildNewsletterHtmlPath(newsletter.content),
      })
    }

    logger.info(
      {
        newsletterPublicId: newsletter.publicId,
        sequenceNumber: newsletter.sequenceNumber,
      },
      NEWSLETTER_UPDATED_SUCCESSFULLY,
    )

    return {
      newsletter: {
        ...newsletter,
        content: buildNewsletterHtmlUrl(newsletter.publicId),
      },
    }
  }
}
