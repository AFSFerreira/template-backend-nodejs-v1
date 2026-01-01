import { ApiError } from '@errors/api-error'
import { NEWSLETTER_NOT_FOUND } from '@messages/responses/newsletter-responses'

export class NewsletterNotFoundError extends ApiError {
  constructor() {
    super(NEWSLETTER_NOT_FOUND)
  }
}
