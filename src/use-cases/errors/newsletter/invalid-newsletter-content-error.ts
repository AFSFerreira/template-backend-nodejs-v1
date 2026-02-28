import { ApiError } from '@errors/api-error'
import { INVALID_NEWSLETTER_CONTENT } from '@messages/responses/newsletter-responses/4xx'

export class InvalidNewsletterContentError extends ApiError {
  constructor() {
    super(INVALID_NEWSLETTER_CONTENT)
  }
}
