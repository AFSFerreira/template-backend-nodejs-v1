import { ApiError } from '@errors/api-error'
import { BLOG_NOT_IN_CHANGES_REQUESTED_STATUS } from '@messages/responses/blog-responses.ts/4xx'

export class BlogNotInChangesRequestedStatusError extends ApiError {
  constructor() {
    super(BLOG_NOT_IN_CHANGES_REQUESTED_STATUS)
  }
}
