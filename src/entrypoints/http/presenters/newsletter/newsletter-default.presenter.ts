import type { IPresenterStrategy } from '@custom-types/custom/presenter-strategy'
import type {
  HTTPNewsletter,
  NewsletterDefaultPresenterInput,
} from '@custom-types/http/presenter/newsletter/newsletter-default'
import { NewsletterUrlBuilderService } from '@services/builders/urls/build-newsletter-image-url'
import { inject, singleton } from 'tsyringe'

@singleton()
export class NewsletterDefaultPresenter implements IPresenterStrategy<NewsletterDefaultPresenterInput, HTTPNewsletter> {
  constructor(
    @inject(NewsletterUrlBuilderService)
    private readonly newsletterUrlBuilderService: NewsletterUrlBuilderService,
  ) {}

  public toHTTP(input: NewsletterDefaultPresenterInput): HTTPNewsletter {
    return {
      id: input.publicId,
      content: this.newsletterUrlBuilderService.buildHtmlUrl(input.publicId),
      sequenceNumber: input.sequenceNumber,
      editionNumber: input.editionNumber,
      volume: input.volume,
      createdAt: input.createdAt,
      updatedAt: input.updatedAt,
    }
  }

  toHTTPList(inputs: NewsletterDefaultPresenterInput[]): HTTPNewsletter[] {
    return inputs.map((input) => this.toHTTP(input))
  }
}
