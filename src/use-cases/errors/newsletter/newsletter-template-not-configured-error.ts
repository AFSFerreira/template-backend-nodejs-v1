import { ApiError } from '@errors/api-error'
import { NEWSLETTER_TEMPLATE_NOT_CONFIGURED } from '@messages/responses/newsletter-responses/4xx'

export class NewsletterTemplateNotConfiguredError extends ApiError {
  constructor() {
    super(NEWSLETTER_TEMPLATE_NOT_CONFIGURED)
  }
}
