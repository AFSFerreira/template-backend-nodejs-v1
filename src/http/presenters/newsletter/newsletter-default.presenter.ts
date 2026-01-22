import type { IPresenterStrategy } from '@custom-types/custom/presenter-strategy'
import type {
  HTTPNewsletter,
  NewsletterDefaultPresenterInput,
} from '@custom-types/http/presenter/newsletter/newsletter-default'

export class NewsletterDefaultPresenter implements IPresenterStrategy<NewsletterDefaultPresenterInput, HTTPNewsletter> {
  public toHTTP(input: NewsletterDefaultPresenterInput): HTTPNewsletter {
    return {
      id: input.publicId,
      content: input.content,
      sequenceNumber: input.sequenceNumber,
      editionNumber: input.editionNumber,
      volume: input.volume,
      createdAt: input.createdAt,
      updatedAt: input.updatedAt,
    }
  }
}
