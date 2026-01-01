import type {
  CreateNewsletterUseCaseRequest,
  CreateNewsletterUseCaseResponse,
} from '@custom-types/use-cases/newsletters/create-newsletter'
import type { DatabaseContext } from '@lib/prisma/helpers/database-context'
import type { NewslettersRepository } from '@repositories/newsletters-repository'
import { logger } from '@lib/logger'
import { logError } from '@lib/logger/helpers/log-error'
import { tokens } from '@lib/tsyringe/helpers/tokens'
import { NEWSLETTER_CREATED_SUCCESSFULLY, NEWSLETTER_CREATION_ERROR } from '@messages/loggings/newsletter-loggings'
import {
  buildNewsletterHtmlPath,
  buildNewsletterTempHtmlPath,
} from '@services/builders/paths/build-newsletter-html-path'
import { persistFile } from '@services/files/persist-file'
import { deleteFile } from '@utils/files/delete-file'
import { ensureNotExists } from '@utils/validators/ensure'
import { inject, injectable } from 'tsyringe'
import { NewsletterAlreadyExistsError } from '../errors/newsletter/newsletter-already-exists-error'
import { NewsletterHtmlPersistError } from '../errors/newsletter/newsletter-html-persist-error'

@injectable()
export class CreateNewsletterUseCase {
  constructor(
    @inject(tokens.repositories.newsletters)
    private readonly newslettersRepository: NewslettersRepository,

    @inject(tokens.infra.database)
    private readonly dbContext: DatabaseContext,
  ) {}

  async execute(createNewsletterInput: CreateNewsletterUseCaseRequest): Promise<CreateNewsletterUseCaseResponse> {
    const { contentFilename, ...filteredCreatedNewsletterInput } = createNewsletterInput

    const content = await persistFile({
      oldFilePath: buildNewsletterTempHtmlPath(contentFilename),
      newFilePath: buildNewsletterHtmlPath(contentFilename),
    })

    if (!content) {
      throw new NewsletterHtmlPersistError()
    }

    try {
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

      logger.info(
        {
          newsletterPublicId: newsletter.publicId,
          sequenceNumber: newsletter.sequenceNumber,
        },
        NEWSLETTER_CREATED_SUCCESSFULLY,
      )

      return { newsletter }
    } catch (error) {
      logError({ error, message: NEWSLETTER_CREATION_ERROR })

      await deleteFile(content)

      throw error
    }
  }
}
