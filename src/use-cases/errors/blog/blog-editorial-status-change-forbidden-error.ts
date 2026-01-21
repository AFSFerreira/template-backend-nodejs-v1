import { ApiError } from '@errors/api-error'
import { BLOG_EDITORIAL_STATUS_CHANGE_FORBIDDEN } from '@messages/responses/blog-responses.ts/4xx'

export class BlogEditorialStatusChangeForbiddenError extends ApiError {
  constructor() {
    super(BLOG_EDITORIAL_STATUS_CHANGE_FORBIDDEN)
  }
}
