import type { IPresenterStrategy } from '@custom-types/custom/presenter-strategy'
import type {
  HTTPNewsletterDetailedWithContent,
  NewsletterDetailedWithContentPresenterInput,
} from '@custom-types/http/presenter/newsletter/newsletter-detailed-with-content'
import type { ProseMirrorSchemaType } from '@custom-types/http/schemas/utils/helpers/generic/prose-mirror-schema'
import { NewsletterUrlBuilderService } from '@services/builders/urls/build-newsletter-image-url'
import { inject, singleton } from 'tsyringe'

@singleton()
export class NewsletterDetailedWithContentPresenter
  implements IPresenterStrategy<NewsletterDetailedWithContentPresenterInput, HTTPNewsletterDetailedWithContent>
{
  constructor(
    @inject(NewsletterUrlBuilderService)
    private readonly newsletterUrlBuilderService: NewsletterUrlBuilderService,
  ) {}

  public toHTTP(input: NewsletterDetailedWithContentPresenterInput): HTTPNewsletterDetailedWithContent
  public toHTTP(input: NewsletterDetailedWithContentPresenterInput[]): HTTPNewsletterDetailedWithContent[]
  public toHTTP(
    input: NewsletterDetailedWithContentPresenterInput | NewsletterDetailedWithContentPresenterInput[],
  ): HTTPNewsletterDetailedWithContent | HTTPNewsletterDetailedWithContent[] {
    if (Array.isArray(input)) {
      return input.map((element) => this.toHTTP(element))
    }
    return {
      id: input.publicId,
      content: this.newsletterUrlBuilderService.buildHtmlUrl(input.publicId),
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
  }
}
