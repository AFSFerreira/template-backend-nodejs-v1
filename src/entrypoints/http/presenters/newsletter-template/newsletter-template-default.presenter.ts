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
  public toHTTP(input: NewsletterTemplateDefaultPresenterInput): HTTPNewsletterTemplate {
    return {
      id: input.publicId,
      templateName: getFileBasename(input.templateFolder),
    }
  }

  toHTTPList(inputs: NewsletterTemplateDefaultPresenterInput[]): HTTPNewsletterTemplate[] {
    return inputs.map((input) => this.toHTTP(input))
  }
}
