import type {
  DeleteNewsletterUseCaseRequest,
  DeleteNewsletterUseCaseResponse,
} from '@custom-types/use-cases/newsletters/delete-newsletter'
import type { NewslettersRepository } from '@repositories/newsletters-repository'
import type { JSONContent } from '@tiptap/core'
import { InvalidFileOperationTypeError } from '@jobs/queues/errors/invalid-file-operation-type-error'
import { deleteFileEnqueued } from '@jobs/queues/facades/file-queue-facade'
import { logger } from '@lib/pino'
import { redis } from '@lib/redis'
import { tsyringeTokens } from '@lib/tsyringe/helpers/tokens'
import { NEWSLETTER_DELETION_SUCCESSFUL } from '@messages/loggings/models/newsletter-loggings'
import { NewsletterFormatType } from '@prisma/generated/enums'
import { buildNewsletterHtmlPath } from '@services/builders/paths/build-newsletter-html-path'
import { buildNewsletterImagePath } from '@services/builders/paths/build-newsletter-image-path'
import { removeNewsletterHTMLCache } from '@services/cache/newsletters-html-cache'
import { extractProseMirrorImages } from '@services/extractors/extract-prose-mirror-images'
import { NewsletterNotFoundError } from '@use-cases/errors/newsletter/newsletter-not-found-error'
import { sanitizeUrlFilename } from '@utils/formatters/sanitize-url-filename'
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

        const images = extractProseMirrorImages(newsletter.proseContent as JSONContent)

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
        throw new InvalidFileOperationTypeError(newsletterFormat satisfies never)
      }
    }

    // Removendo o cache HTML da newsletter:
    await removeNewsletterHTMLCache({ newsletterId: newsletter.id, redis })

    logger.info({ newsletterPublicId: newsletter.publicId }, NEWSLETTER_DELETION_SUCCESSFUL)

    return {}
  }
}
