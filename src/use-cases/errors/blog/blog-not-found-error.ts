import { ApiError } from '@errors/api-error'
import { BLOG_NOT_FOUND } from '@messages/responses/blog-responses.ts/4xx'

export class BlogNotFoundError extends ApiError {
  constructor() {
    super(BLOG_NOT_FOUND)
  }
}
