import type {
  DeleteNewsletterUseCaseRequest,
  DeleteNewsletterUseCaseResponse,
} from '@custom-types/use-cases/newsletters/delete-newsletter'
import type { NewslettersRepository } from '@repositories/newsletters-repository'
import { deleteFileEnqueued } from '@jobs/queues/facades/file-queue-facade'
import { logger } from '@lib/logger'
import { tsyringeTokens } from '@lib/tsyringe/helpers/tokens'
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
  ) {}

  async execute({ publicId }: DeleteNewsletterUseCaseRequest): Promise<DeleteNewsletterUseCaseResponse> {
    const newsletter = ensureExists({
      value: await this.newslettersRepository.findByPublicId(publicId),
      error: new NewsletterNotFoundError(),
    })

    await this.newslettersRepository.delete(newsletter.id)

    await deleteFileEnqueued({
      filePath: buildNewsletterHtmlPath(newsletter.content),
    })

    logger.info({ newsletterPublicId: newsletter.publicId }, NEWSLETTER_DELETION_SUCCESSFUL)

    return {}
  }
}
