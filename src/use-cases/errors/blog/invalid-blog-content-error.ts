import { ApiError } from '@errors/api-error'
import { INVALID_BLOG_CONTENT } from '@messages/responses/blog-responses'

export class InvalidBlogContentError extends ApiError {
  constructor() {
    super(INVALID_BLOG_CONTENT)
  }
}
