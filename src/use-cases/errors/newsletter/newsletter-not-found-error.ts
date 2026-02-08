import { ApiError } from '@errors/api-error'
import { NEWSLETTER_NOT_FOUND } from '@messages/responses/newsletter-responses/4xx'

export class NewsletterNotFoundError extends ApiError {
  constructor() {
    super(NEWSLETTER_NOT_FOUND)
  }
}
