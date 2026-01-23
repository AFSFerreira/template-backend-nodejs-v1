import type {
  UpdateNewsletterUseCaseRequest,
  UpdateNewsletterUseCaseResponse,
} from '@custom-types/use-cases/newsletters/update-newsletter'
import type { DatabaseContext } from '@lib/prisma/helpers/database-context'
import type { Prisma } from '@prisma/client'
import type { NewslettersRepository } from '@repositories/newsletters-repository'
import { fileQueue } from '@jobs/queues/definitions/file-queue'
import { logger } from '@lib/logger'
import { logError } from '@lib/logger/helpers/log-error'
import { tsyringeTokens } from '@lib/tsyringe/helpers/tokens'
import { FAILED_TO_ENQUEUE_FILE_JOB } from '@messages/loggings/jobs/queues/files'
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
    const { newsletter } = await this.dbContext.runInTransaction(async () => {
      try {
        const newsletter = ensureExists({
          value: await this.newslettersRepository.findByPublicId(publicId),
          error: new NewsletterNotFoundError(),
        })

        const updateData: Prisma.NewsletterUpdateInput = {}

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

        if (body.contentFilename && body.contentFilename !== newsletter.content) {
          ensureExists({
            value: await moveFile({
              oldFilePath: buildNewsletterTempHtmlPath(body.contentFilename),
              newFilePath: buildNewsletterHtmlPath(body.contentFilename),
            }),
            error: new NewsletterHtmlPersistError(),
          })

          updateData.content = body.contentFilename
        }

        const updatedNewsletter = await this.newslettersRepository.update({
          id: newsletter.id,
          data: updateData,
        })

        return { newsletter: updatedNewsletter }
      } catch (error) {
        // Enfileirando a restauração do arquivo incorretamente persistido:
        if (body.contentFilename) {
          try {
            fileQueue.add('move', {
              type: 'move',
              oldFilePath: buildNewsletterHtmlPath(body.contentFilename),
              newFilePath: buildNewsletterTempHtmlPath(body.contentFilename),
            })
          } catch (fileError) {
            logError({
              error: fileError,
              message: FAILED_TO_ENQUEUE_FILE_JOB,
            })
          }
        }

        throw error
      }
    })

    // Enfileirando a remoção do arquivo antigo somente após update bem-sucedido:
    if (body.contentFilename && body.contentFilename !== newsletter.content) {
      try {
        fileQueue.add('delete', {
          type: 'delete',
          filePath: buildNewsletterHtmlPath(newsletter.content),
        })
      } catch (error) {
        logError({
          error,
          message: FAILED_TO_ENQUEUE_FILE_JOB,
        })
      }
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
        content: buildNewsletterHtmlUrl(newsletter.content),
      },
    }
  }
}
