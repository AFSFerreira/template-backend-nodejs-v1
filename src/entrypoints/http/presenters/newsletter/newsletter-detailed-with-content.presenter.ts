import type { IPresenterStrategy } from '@custom-types/custom/presenter-strategy'
import type {
  HTTPNewsletterDetailedWithContent,
  NewsletterDetailedWithContentPresenterInput,
} from '@custom-types/http/presenter/newsletter/newsletter-detailed-with-content'

export class NewsletterDetailedWithContentPresenter
  implements IPresenterStrategy<NewsletterDetailedWithContentPresenterInput, HTTPNewsletterDetailedWithContent>
{
  public toHTTP(input: NewsletterDetailedWithContentPresenterInput): HTTPNewsletterDetailedWithContent {
    return {
      id: input.publicId,
      content: input.contentUrl,
      sequenceNumber: input.sequenceNumber,
      editionNumber: input.editionNumber,
      format: input.format,
      volume: input.volume,
      createdAt: input.createdAt,
      updatedAt: input.updatedAt,
      proseContent: input.proseContent,
      fileContent: input.fileContent,
    }
  }
}
