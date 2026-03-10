import type {
  HTTPNewsletter,
  NewsletterDefaultPresenterInput,
} from '@custom-types/http/presenter/newsletter/newsletter-default'
import { buildNewsletterHtmlUrl } from '@services/builders/urls/build-newsletter-html-url'

export const NewsletterDefaultPresenter = {
  toHTTP(input: NewsletterDefaultPresenterInput): HTTPNewsletter {
    return {
      id: input.publicId,
      content: buildNewsletterHtmlUrl(input.publicId),
      sequenceNumber: input.sequenceNumber,
      editionNumber: input.editionNumber,
      volume: input.volume,
      createdAt: input.createdAt,
      updatedAt: input.updatedAt,
    }
  },

  toHTTPList(inputs: NewsletterDefaultPresenterInput[]): HTTPNewsletter[] {
    return inputs.map(this.toHTTP)
  },
}
