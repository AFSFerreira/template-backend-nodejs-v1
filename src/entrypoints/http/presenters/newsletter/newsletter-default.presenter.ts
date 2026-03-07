import type { IPresenterStrategy } from '@custom-types/custom/presenter-strategy'
import type {
  HTTPNewsletter,
  NewsletterDefaultPresenterInput,
} from '@custom-types/http/presenter/newsletter/newsletter-default'
import { buildNewsletterHtmlUrl } from '@services/builders/urls/build-newsletter-html-url'

export class NewsletterDefaultPresenter implements IPresenterStrategy<NewsletterDefaultPresenterInput, HTTPNewsletter> {
  public toHTTP(input: NewsletterDefaultPresenterInput): HTTPNewsletter {
    return {
      id: input.publicId,
      content: buildNewsletterHtmlUrl(input.publicId),
      sequenceNumber: input.sequenceNumber,
      editionNumber: input.editionNumber,
      volume: input.volume,
      createdAt: input.createdAt,
      updatedAt: input.updatedAt,
    }
  }
}
