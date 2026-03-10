import type {
  HTTPNewsletterTemplate,
  NewsletterTemplateDefaultPresenterInput,
} from '@custom-types/http/presenter/newsletter-template/newsletter-template-default'
import { getFileBasename } from '@utils/files/get-file-basename'

export const NewsletterTemplateDefaultPresenter = {
  toHTTP(input: NewsletterTemplateDefaultPresenterInput): HTTPNewsletterTemplate {
    return {
      id: input.publicId,
      templateName: getFileBasename(input.templateFolder),
    }
  },

  toHTTPList(inputs: NewsletterTemplateDefaultPresenterInput[]): HTTPNewsletterTemplate[] {
    return inputs.map(this.toHTTP)
  },
}
