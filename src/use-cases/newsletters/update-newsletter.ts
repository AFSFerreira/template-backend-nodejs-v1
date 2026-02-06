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
import { moveFile } from '@services/files/move-file'
import { NewsletterAlreadyExistsError } from '@use-cases/errors/newsletter/newsletter-already-exists-error'
import { NewsletterHtmlPersistError } from '@use-cases/errors/newsletter/newsletter-html-persist-error'
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

    const filenameSanitized = sanitizeUrlFilename(body.contentFilename)

    const { updatedNewsletter } = await this.dbContext.runInTransaction(async () => {
      try {
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
            sequenceNumber,
            editionNumber,
            volume,
          })

          if (conflictingNewsletter && conflictingNewsletter.id !== newsletter.id) {
            throw new NewsletterAlreadyExistsError()
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

        if (body.contentFilename && filenameSanitized && filenameSanitized !== newsletter.content) {
          ensureExists({
            value: await moveFile({
              oldFilePath: buildNewsletterTempHtmlPath(filenameSanitized),
              newFilePath: buildNewsletterHtmlPath(filenameSanitized),
            }),
            error: new NewsletterHtmlPersistError(),
          })

          updateData.content = body.contentFilename
        }

        const updatedNewsletter = await this.newslettersRepository.update({
          id: newsletter.id,
          data: updateData,
        })

        return { updatedNewsletter }
      } catch (error) {
        // Enfileirando a restauração do arquivo incorretamente persistido:
        if (body.contentFilename && filenameSanitized && filenameSanitized !== updatedNewsletter.content) {
          await moveFileEnqueued({
            oldFilePath: buildNewsletterHtmlPath(filenameSanitized),
            newFilePath: buildNewsletterTempHtmlPath(filenameSanitized),
          })
        }

        throw error
      }
    })

    // Enfileirando a remoção do arquivo antigo somente após update bem-sucedido:
    if (body.contentFilename && filenameSanitized && filenameSanitized !== updatedNewsletter.content) {
      await deleteFileEnqueued({
        filePath: buildNewsletterHtmlPath(updatedNewsletter.content),
      })
    }

    logger.info(
      {
        newsletterPublicId: updatedNewsletter.publicId,
        sequenceNumber: updatedNewsletter.sequenceNumber,
      },
      NEWSLETTER_UPDATED_SUCCESSFULLY,
    )

    return {
      newsletter: {
        ...updatedNewsletter,
        content: buildNewsletterHtmlUrl(updatedNewsletter.content),
      },
    }
  }
}
