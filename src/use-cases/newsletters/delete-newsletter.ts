import type {
  DeleteNewsletterUseCaseRequest,
  DeleteNewsletterUseCaseResponse,
} from '@custom-types/use-cases/newsletters/delete-newsletter'
import type { DatabaseContext } from '@lib/prisma/helpers/database-context'
import type { NewslettersRepository } from '@repositories/newsletters-repository'
import { logger } from '@lib/logger'
import { tokens } from '@lib/tsyringe/helpers/tokens'
import { NEWSLETTER_DELETION_SUCCESSFUL } from '@messages/loggings/newsletter-loggings'
import { buildNewsletterHtmlPath } from '@services/builders/paths/build-newsletter-html-path'
import { NewsletterNotFoundError } from '@use-cases/errors/newsletter/newsletter-not-found-error'
import { deleteFile } from '@utils/files/delete-file'
import { ensureExists } from '@utils/validators/ensure'
import { inject, injectable } from 'tsyringe'

@injectable()
export class DeleteNewsletterUseCase {
  constructor(
    @inject(tokens.repositories.newsletters)
    private readonly newslettersRepository: NewslettersRepository,

    @inject(tokens.infra.database)
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

    await deleteFile(buildNewsletterHtmlPath(newsletter.content))

    logger.info({ newsletterPublicId: newsletter.publicId }, NEWSLETTER_DELETION_SUCCESSFUL)

    return {}
  }
}
