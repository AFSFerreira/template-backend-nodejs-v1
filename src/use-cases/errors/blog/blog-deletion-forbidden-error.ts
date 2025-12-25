import { ApiError } from '@errors/api-error'
import { BLOG_DELETION_FORBIDDEN } from '@messages/responses/blog-responses'

export class BlogDeletionForbiddenError extends ApiError {
  constructor() {
    super(BLOG_DELETION_FORBIDDEN)
  }
}
