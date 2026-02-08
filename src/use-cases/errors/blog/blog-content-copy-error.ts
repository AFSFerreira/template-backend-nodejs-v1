import { ApiError } from '@errors/api-error'
import { BLOG_CONTENT_COPY_FAILED } from '@messages/responses/blog-responses/5xx'

export class BlogContentCopyError extends ApiError {
  constructor() {
    super(BLOG_CONTENT_COPY_FAILED)
  }
}
