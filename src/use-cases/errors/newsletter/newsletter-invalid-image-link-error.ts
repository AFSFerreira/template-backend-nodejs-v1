import { ApiError } from '@errors/api-error'
import { NEWSLETTER_INVALID_IMAGE_LINK } from '@messages/responses/newsletter-responses/4xx'

export class NewsletterInvalidImageLinkError extends ApiError {
  constructor() {
    super(NEWSLETTER_INVALID_IMAGE_LINK)
  }
}
