import { ApiError } from '@errors/api-error'
import { BLOG_IMAGE_PERSIST_FAILED } from '@messages/responses/blog-responses.ts/5xx'

export class BlogImagePersistError extends ApiError {
  constructor() {
    super(BLOG_IMAGE_PERSIST_FAILED)
  }
}
