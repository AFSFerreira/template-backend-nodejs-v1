import { ApiError } from '@errors/api-error'
import { NEWSLETTER_HTML_PERSIST_ERROR } from '@messages/responses/newsletter-responses/5xx'

export class NewsletterHtmlPersistError extends ApiError {
  constructor() {
    super(NEWSLETTER_HTML_PERSIST_ERROR)
  }
}
