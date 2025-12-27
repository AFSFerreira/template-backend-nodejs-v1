import { ApiError } from '@errors/api-error'
import { BLOG_BANNER_REQUIRED_FOR_NON_DRAFT } from '@messages/responses/blog-responses'

export class BlogBannerRequiredError extends ApiError {
  constructor() {
    super(BLOG_BANNER_REQUIRED_FOR_NON_DRAFT)
  }
}
