import { ApiError } from '@errors/api-error'
import { BLOG_ACCESS_FORBIDDEN } from '@messages/responses/blog-responses.ts/4xx'

export class BlogAccessForbiddenError extends ApiError {
  constructor() {
    super(BLOG_ACCESS_FORBIDDEN)
  }
}
