import { ApiError } from '@errors/api-error'
import { BLOG_INVALID_IMAGE_LINK } from '@messages/responses/blog-responses.ts/4xx'

export class BlogInvalidImageLinkError extends ApiError {
  constructor() {
    super(BLOG_INVALID_IMAGE_LINK)
  }
}
