import { ApiError } from '@errors/api-error'
import { BLOG_IMAGE_COPY_FAILED } from '@messages/responses/blog-responses.ts/5xx'

export class BlogImageCopyError extends ApiError {
  constructor() {
    super(BLOG_IMAGE_COPY_FAILED)
  }
}
