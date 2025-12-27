import { ApiError } from '@errors/api-error'
import { BLOG_INVALID_IMAGE_LINK_ON_COPY } from '@messages/responses/blog-responses'

export class BlogInvalidImageLinkOnCopyError extends ApiError {
  constructor() {
    super(BLOG_INVALID_IMAGE_LINK_ON_COPY)
  }
}
