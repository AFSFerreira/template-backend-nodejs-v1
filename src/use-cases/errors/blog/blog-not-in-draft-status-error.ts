import { ApiError } from '@errors/api-error'
import { BLOG_NOT_IN_DRAFT_STATUS } from '@messages/responses/blog-responses.ts/4xx'

export class BlogNotInDraftStatusError extends ApiError {
  constructor() {
    super(BLOG_NOT_IN_DRAFT_STATUS)
  }
}
