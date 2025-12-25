import { ApiError } from '@errors/api-error'
import { BLOG_INVALID_BANNER_LINK } from '@messages/responses/blog-responses'

export class BlogInvalidBannerLinkError extends ApiError {
  constructor() {
    super(BLOG_INVALID_BANNER_LINK)
  }
}
