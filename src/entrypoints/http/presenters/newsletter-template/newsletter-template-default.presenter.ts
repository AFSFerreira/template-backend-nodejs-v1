import type { IPresenterStrategy } from '@custom-types/custom/presenter-strategy'
import type {
  HTTPNewsletterTemplate,
  NewsletterTemplateDefaultPresenterInput,
} from '@custom-types/http/presenter/newsletter-template/newsletter-template-default'
import { getFileBasename } from '@utils/files/get-file-basename'
import { singleton } from 'tsyringe'

@singleton()
export class NewsletterTemplateDefaultPresenter
  implements IPresenterStrategy<NewsletterTemplateDefaultPresenterInput, HTTPNewsletterTemplate>
{
  public toHTTP(input: NewsletterTemplateDefaultPresenterInput): HTTPNewsletterTemplate
  public toHTTP(input: NewsletterTemplateDefaultPresenterInput[]): HTTPNewsletterTemplate[]
  public toHTTP(
    input: NewsletterTemplateDefaultPresenterInput | NewsletterTemplateDefaultPresenterInput[],
  ): HTTPNewsletterTemplate | HTTPNewsletterTemplate[] {
    if (Array.isArray(input)) {
      return input.map((element) => this.toHTTP(element))
    }
    return {
      id: input.publicId,
      templateName: getFileBasename(input.templateFolder),
    }
  }
}
