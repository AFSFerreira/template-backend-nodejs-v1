import { ApiError } from '@errors/api-error'
import { BLOG_NOT_IN_PUBLISHED_STATUS } from '@messages/responses/blog-responses'

export class BlogNotInPublishedStatusError extends ApiError {
  constructor() {
    super(BLOG_NOT_IN_PUBLISHED_STATUS)
  }
}
