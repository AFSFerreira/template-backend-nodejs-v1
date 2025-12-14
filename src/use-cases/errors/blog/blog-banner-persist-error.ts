import { ApiError } from '@errors/api-error'
import { BLOG_BANNER_PERSIST_FAILED } from '@messages/responses/blog-responses'

export class BlogBannerPersistError extends ApiError {
  constructor() {
    super(BLOG_BANNER_PERSIST_FAILED)
  }
}
