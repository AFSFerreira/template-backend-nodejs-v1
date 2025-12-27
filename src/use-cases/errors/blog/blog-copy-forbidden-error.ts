import { ApiError } from '@errors/api-error'
import { BLOG_COPY_FORBIDDEN } from '@messages/responses/blog-responses'

export class BlogCopyForbiddenError extends ApiError {
  constructor() {
    super(BLOG_COPY_FORBIDDEN)
  }
}
