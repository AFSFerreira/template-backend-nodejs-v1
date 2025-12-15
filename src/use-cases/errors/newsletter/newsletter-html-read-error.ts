import { ApiError } from '@errors/api-error'
import { NEWSLETTER_HTML_READ_ERROR } from '@messages/responses/newsletter-responses'

export class NewsletterHtmlReadError extends ApiError {
  constructor() {
    super(NEWSLETTER_HTML_READ_ERROR)
  }
}
