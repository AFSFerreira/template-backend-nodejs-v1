import type {
  HTTPNewsletterDetailedWithContent,
  NewsletterDetailedWithContentPresenterInput,
} from '@custom-types/http/presenter/newsletter/newsletter-detailed-with-content'
import type { ProseMirrorSchemaType } from '@custom-types/http/schemas/utils/helpers/generic/prose-mirror-schema'
import { buildNewsletterHtmlUrl } from '@services/builders/urls/build-newsletter-html-url'

export const NewsletterDetailedWithContentPresenter = {
  toHTTP(input: NewsletterDetailedWithContentPresenterInput): HTTPNewsletterDetailedWithContent {
    return {
      id: input.publicId,
      content: buildNewsletterHtmlUrl(input.publicId),
      sequenceNumber: input.sequenceNumber,
      editionNumber: input.editionNumber,
      format: input.format,
      volume: input.volume,
      createdAt: input.createdAt,
      updatedAt: input.updatedAt,
      proseContent: input.proseContent as ProseMirrorSchemaType,
      fileContent: input.fileContent,
      templateId: input.NewsletterTemplate?.publicId,
    }
  },

  toHTTPList(inputs: NewsletterDetailedWithContentPresenterInput[]): HTTPNewsletterDetailedWithContent[] {
    return inputs.map(this.toHTTP)
  },
}
