import { ApiError } from '@errors/api-error'
import { NEWSLETTER_ALREADY_EXISTS } from '@messages/responses/newsletter-responses.ts/4xx'

export class NewsletterAlreadyExistsError extends ApiError {
  constructor() {
    super(NEWSLETTER_ALREADY_EXISTS)
  }
}
