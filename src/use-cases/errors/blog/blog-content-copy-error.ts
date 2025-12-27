import { ApiError } from '@errors/api-error'
import { BLOG_CONTENT_COPY_FAILED } from '@messages/responses/blog-responses'

export class BlogContentCopyError extends ApiError {
  constructor() {
    super(BLOG_CONTENT_COPY_FAILED)
  }
}
