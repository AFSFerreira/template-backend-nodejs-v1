import { ApiError } from '@errors/api-error'
import { NEWSLETTER_TEMPLATE_NOT_FOUND } from '@messages/responses/newsletter-responses/4xx'

export class NewsletterTemplateNotFoundError extends ApiError {
  constructor() {
    super(NEWSLETTER_TEMPLATE_NOT_FOUND)
  }
}
