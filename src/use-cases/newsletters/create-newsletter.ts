import type {
  CreateNewsletterUseCaseRequest,
  CreateNewsletterUseCaseResponse,
} from '@custom-types/use-cases/newsletters/create-newsletter'
import type { DatabaseContext } from '@lib/prisma/helpers/database-context'
import type { NewslettersRepository } from '@repositories/newsletters-repository'
import { moveFileEnqueued } from '@jobs/queues/facades/file-queue-facade'
import { logger } from '@lib/logger'
import { logError } from '@lib/logger/helpers/log-error'
import { tsyringeTokens } from '@lib/tsyringe/helpers/tokens'
import {
  NEWSLETTER_CREATED_SUCCESSFULLY,
  NEWSLETTER_CREATION_ERROR,
} from '@messages/loggings/models/newsletter-loggings'
import {
  buildNewsletterHtmlPath,
  buildNewsletterTempHtmlPath,
} from '@services/builders/paths/build-newsletter-html-path'
import { buildNewsletterHtmlUrl } from '@services/builders/urls/build-newsletter-html-url'
import { ensureExists, ensureNotExists } from '@utils/validators/ensure'
import { inject, injectable } from 'tsyringe'
import { NewsletterAlreadyExistsError } from '../errors/newsletter/newsletter-already-exists-error'
import { NewsletterHtmlPersistError } from '../errors/newsletter/newsletter-html-persist-error'

@injectable()
export class CreateNewsletterUseCase {
  constructor(
    @inject(tsyringeTokens.repositories.newsletters)
    private readonly newslettersRepository: NewslettersRepository,

    @inject(tsyringeTokens.infra.database)
    private readonly dbContext: DatabaseContext,
  ) {}

  async execute(createNewsletterInput: CreateNewsletterUseCaseRequest): Promise<CreateNewsletterUseCaseResponse> {
    const { contentFilename, ...filteredCreatedNewsletterInput } = createNewsletterInput

    const { newsletter } = await this.dbContext.runInTransaction(async () => {
      ensureNotExists({
        value: await this.newslettersRepository.findConflictingNewsletter({
          editionNumber: createNewsletterInput.editionNumber,
          sequenceNumber: createNewsletterInput.sequenceNumber,
          volume: createNewsletterInput.volume,
        }),
        error: new NewsletterAlreadyExistsError(),
      })

      const newsletter = await this.newslettersRepository.create({
        ...filteredCreatedNewsletterInput,
        content: contentFilename,
      })

      return { newsletter }
    })

    const newsletterHtmlPaths = {
      oldFilePath: buildNewsletterTempHtmlPath(contentFilename),
      newFilePath: buildNewsletterHtmlPath(contentFilename),
    }

    try {
      ensureExists({
        value: await moveFileEnqueued(newsletterHtmlPaths),
        error: new NewsletterHtmlPersistError(),
      })
    } catch (error) {
      logError({ error, message: NEWSLETTER_CREATION_ERROR })

      // Restaurando o arquivo incorretamente persistido:
      await moveFileEnqueued({
        oldFilePath: newsletterHtmlPaths.newFilePath,
        newFilePath: newsletterHtmlPaths.oldFilePath,
      })

      throw error
    }

    logger.info(
      {
        newsletterPublicId: newsletter.publicId,
        sequenceNumber: newsletter.sequenceNumber,
      },
      NEWSLETTER_CREATED_SUCCESSFULLY,
    )

    return {
      newsletter: {
        ...newsletter,
        content: buildNewsletterHtmlUrl(newsletter.content),
      },
    }
  }
}
