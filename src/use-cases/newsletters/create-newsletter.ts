import type { ImagePathInfo } from '@custom-types/custom/image-path-info'
import type {
  CreateNewsletterUseCaseRequest,
  CreateNewsletterUseCaseResponse,
} from '@custom-types/use-cases/newsletters/create-newsletter'
import type { InputJsonValue } from '@prisma/client/runtime/client'
import type { NewsletterTemplate } from '@prisma/generated/client'
import type { NewsletterTemplatesRepository } from '@repositories/newsletter-templates-repository'
import type { NewslettersRepository } from '@repositories/newsletters-repository'
import { logger } from '@lib/pino'
import { tiptapConfiguration } from '@lib/tiptap/helpers/configuration'
import { tsyringeTokens } from '@lib/tsyringe/helpers/tokens'
import { NEWSLETTER_CREATED_SUCCESSFULLY } from '@messages/loggings/models/newsletter-loggings'
import { Prisma } from '@prisma/generated/client'
import { NewsletterFormatType } from '@prisma/generated/enums'
import { buildNewsletterImageUrl } from '@services/builders/urls/build-newsletter-image-url'
import { extractProseMirrorImages } from '@services/extractors/extract-prose-mirror-images'
import { InvalidNewsletterContentError } from '@use-cases/errors/newsletter/invalid-newsletter-content-error'
import { NewsletterInvalidImageLinkError } from '@use-cases/errors/newsletter/newsletter-invalid-image-link-error'
import { NewsletterTemplateNotFoundError } from '@use-cases/errors/newsletter/newsletter-template-not-found-error'
import { buildNewsletterHtmlPath, buildNewsletterTempHtmlPath } from '@utils/builders/paths/build-newsletter-html-path'
import {
  buildNewsletterImagePath,
  buildNewsletterTempImagePath,
} from '@utils/builders/paths/build-newsletter-image-path'
import { getProseMirrorText } from '@utils/extractors/get-prose-mirror-text'
import { replaceProseMirrorImages } from '@utils/extractors/replace-prose-mirror-images'
import { moveFilesIfNotExists } from '@utils/files/move-files-if-not-exists'
import { sanitizeUrlFilename } from '@utils/formatters/sanitize-url-filename'
import { ensureExists, ensureNotExists } from '@utils/validators/ensure'
import { inject, injectable } from 'tsyringe'
import { NewsletterAlreadyExistsError } from '../errors/newsletter/newsletter-already-exists-error'

@injectable()
export class CreateNewsletterUseCase {
  constructor(
    @inject(tsyringeTokens.repositories.newsletters)
    private readonly newslettersRepository: NewslettersRepository,

    @inject(tsyringeTokens.repositories.newsletterTemplates)
    private readonly newsletterTemplatesRepository: NewsletterTemplatesRepository,
  ) {}

  async execute(createNewsletterInput: CreateNewsletterUseCaseRequest): Promise<CreateNewsletterUseCaseResponse> {
    const { content, ...filteredContent } = createNewsletterInput

    let templateId: string | undefined

    if (content.format === 'PROSEMIRROR') {
      templateId = content.templateId
    }

    ensureNotExists({
      value: await this.newslettersRepository.findConflictingNewsletter({
        editionNumber: filteredContent.editionNumber,
        sequenceNumber: filteredContent.sequenceNumber,
        volume: filteredContent.volume,
      }),
      error: new NewsletterAlreadyExistsError(),
    })

    let newsletterTemplate: NewsletterTemplate | undefined

    if (content.format === NewsletterFormatType.HTML_FILE) {
      const newsletter = await this.newslettersRepository.create({
        ...filteredContent,
        format: NewsletterFormatType.HTML_FILE,
        fileContent: content.contentFilename,
        proseContent: Prisma.DbNull,
      })

      await moveFilesIfNotExists({
        oldFilePath: buildNewsletterTempHtmlPath(content.contentFilename),
        newFilePath: buildNewsletterHtmlPath(content.contentFilename),
      })

      logger.info(
        { newsletterPublicId: newsletter.publicId, sequenceNumber: newsletter.sequenceNumber },
        NEWSLETTER_CREATED_SUCCESSFULLY,
      )

      return {
        newsletter,
      }
    }

    // Formato ProseMirror:
    ensureExists({
      value: getProseMirrorText({ proseMirror: content.proseContent, tiptapConfiguration }),
      error: new InvalidNewsletterContentError(),
    })

    if (templateId) {
      newsletterTemplate = ensureExists({
        value: await this.newsletterTemplatesRepository.findByPublicId(templateId),
        error: new NewsletterTemplateNotFoundError(),
      })
    }

    if (!templateId || !newsletterTemplate) {
      throw new NewsletterTemplateNotFoundError()
    }

    const oldToNewImagesLinkMap = new Map<string, string>()

    const formattedNewsletterImages: ImagePathInfo[] = Array.from(extractProseMirrorImages(content.proseContent)).map(
      (imageLink) => {
        const imageName = ensureExists({
          value: sanitizeUrlFilename(imageLink),
          error: new NewsletterInvalidImageLinkError(),
        })

        oldToNewImagesLinkMap.set(imageLink, buildNewsletterImageUrl(imageName))

        return {
          oldFilePath: buildNewsletterTempImagePath(imageName),
          newFilePath: buildNewsletterImagePath(imageName),
        }
      },
    )

    const newProseMirror = replaceProseMirrorImages({
      proseMirror: content.proseContent,
      oldToNewImagesMap: oldToNewImagesLinkMap,
    })

    const newsletter = await this.newslettersRepository.create({
      ...filteredContent,
      format: NewsletterFormatType.PROSEMIRROR,
      fileContent: null,
      proseContent: newProseMirror as InputJsonValue,
      newsletterTemplateId: newsletterTemplate.id,
    })

    await moveFilesIfNotExists(formattedNewsletterImages)

    logger.info(
      { newsletterPublicId: newsletter.publicId, sequenceNumber: newsletter.sequenceNumber },
      NEWSLETTER_CREATED_SUCCESSFULLY,
    )

    return {
      newsletter,
    }
  }
}
