import { ApiError } from '@errors/api-error'
import { BLOG_IMAGE_NOT_FOUND } from '@messages/responses/blog-responses'

export class BlogImageNotFoundError extends ApiError {
  constructor() {
    super(BLOG_IMAGE_NOT_FOUND)
  }
}
