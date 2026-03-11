import type {
  DeleteNewsletterUseCaseRequest,
  DeleteNewsletterUseCaseResponse,
} from '@custom-types/use-cases/newsletters/delete-newsletter'
import type { NewslettersRepository } from '@repositories/newsletters-repository'
import type { JSONContent } from '@tiptap/core'
import { UnreachableCaseError } from '@errors/unreachable-case-error'
import { deleteFileEnqueued } from '@jobs/queues/facades/file-queue-facade'
import { logger } from '@lib/pino'
import { tsyringeTokens } from '@lib/tsyringe/helpers/tokens'
import { NEWSLETTER_DELETION_SUCCESSFUL } from '@messages/loggings/models/newsletter-loggings'
import { NewsletterFormatType } from '@prisma/generated/enums'
import { NewsletterHtmlCacheService } from '@services/caches/newsletters-html-cache'
import { ProseMirrorExtractorService } from '@services/extractors/extract-prose-mirror-images'
import { NewsletterNotFoundError } from '@use-cases/errors/newsletter/newsletter-not-found-error'
import { buildNewsletterHtmlPath } from '@utils/builders/paths/build-newsletter-html-path'
import { buildNewsletterImagePath } from '@utils/builders/paths/build-newsletter-image-path'
import { sanitizeUrlFilename } from '@utils/formatters/sanitize-url-filename'
import { ensureExists } from '@utils/validators/ensure'
import { inject, injectable } from 'tsyringe'

@injectable()
export class DeleteNewsletterUseCase {
  constructor(
    @inject(tsyringeTokens.repositories.newsletters)
    private readonly newslettersRepository: NewslettersRepository,

    @inject(NewsletterHtmlCacheService)
    private readonly newsletterHtmlCacheService: NewsletterHtmlCacheService,

    @inject(ProseMirrorExtractorService)
    private readonly proseMirrorExtractorService: ProseMirrorExtractorService,
  ) {}

  async execute({ publicId }: DeleteNewsletterUseCaseRequest): Promise<DeleteNewsletterUseCaseResponse> {
    const newsletter = ensureExists({
      value: await this.newslettersRepository.findByPublicId(publicId),
      error: new NewsletterNotFoundError(),
    })

    await this.newslettersRepository.delete(newsletter.id)

    const newsletterFormat = newsletter.format

    switch (newsletterFormat) {
      case NewsletterFormatType.HTML_FILE: {
        if (!newsletter.fileContent) break

        if (newsletter.fileContent) {
          await deleteFileEnqueued({
            filePath: buildNewsletterHtmlPath(newsletter.fileContent),
          })
        }

        break
      }

      case NewsletterFormatType.PROSEMIRROR: {
        if (!newsletter.proseContent) break

        const images = this.proseMirrorExtractorService.extractImages(newsletter.proseContent as JSONContent)

        for (const imageLink of images) {
          const imageName = sanitizeUrlFilename(imageLink)

          if (imageName) {
            await deleteFileEnqueued({
              filePath: buildNewsletterImagePath(imageName),
            })
          }
        }

        break
      }

      default: {
        throw new UnreachableCaseError(newsletterFormat satisfies never)
      }
    }

    // Removendo o cache HTML da newsletter:
    await this.newsletterHtmlCacheService.remove(newsletter.publicId)

    logger.info({ newsletterPublicId: newsletter.publicId }, NEWSLETTER_DELETION_SUCCESSFUL)

    return {}
  }
}
