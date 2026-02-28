import { ApiError } from '@errors/api-error'
import { NEWSLETTER_INVALID_FILENAME } from '@messages/responses/newsletter-responses/4xx'

export class NewsletterInvalidFilenameError extends ApiError {
  constructor() {
    super(NEWSLETTER_INVALID_FILENAME)
  }
}
