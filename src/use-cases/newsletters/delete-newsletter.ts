import type {
  DeleteNewsletterUseCaseRequest,
  DeleteNewsletterUseCaseResponse,
} from '@custom-types/use-cases/newsletters/delete-newsletter'
import type { DatabaseContext } from '@lib/prisma/helpers/database-context'
import type { NewslettersRepository } from '@repositories/newsletters-repository'
import { fileQueue } from '@jobs/queues/definitions/file-queue'
import { logger } from '@lib/logger'
import { logError } from '@lib/logger/helpers/log-error'
import { tsyringeTokens } from '@lib/tsyringe/helpers/tokens'
import { FAILED_TO_ENQUEUE_FILE_JOB } from '@messages/loggings/jobs/queues/files'
import { NEWSLETTER_DELETION_SUCCESSFUL } from '@messages/loggings/models/newsletter-loggings'
import { buildNewsletterHtmlPath } from '@services/builders/paths/build-newsletter-html-path'
import { NewsletterNotFoundError } from '@use-cases/errors/newsletter/newsletter-not-found-error'
import { ensureExists } from '@utils/validators/ensure'
import { inject, injectable } from 'tsyringe'

@injectable()
export class DeleteNewsletterUseCase {
  constructor(
    @inject(tsyringeTokens.repositories.newsletters)
    private readonly newslettersRepository: NewslettersRepository,

    @inject(tsyringeTokens.infra.database)
    private readonly dbContext: DatabaseContext,
  ) {}

  async execute({ publicId }: DeleteNewsletterUseCaseRequest): Promise<DeleteNewsletterUseCaseResponse> {
    const { newsletter } = await this.dbContext.runInTransaction(async () => {
      const newsletter = ensureExists({
        value: await this.newslettersRepository.findByPublicId(publicId),
        error: new NewsletterNotFoundError(),
      })

      await this.newslettersRepository.delete(newsletter.id)

      return { newsletter }
    })

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

    logger.info({ newsletterPublicId: newsletter.publicId }, NEWSLETTER_DELETION_SUCCESSFUL)

    return {}
  }
}
