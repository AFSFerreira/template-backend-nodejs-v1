import { ApiError } from '@errors/api-error'
import { BLOG_NOT_IN_PENDING_APPROVAL_STATUS } from '@messages/responses/blog-responses/4xx'

export class BlogNotInPendingApprovalStatusError extends ApiError {
  constructor() {
    super(BLOG_NOT_IN_PENDING_APPROVAL_STATUS)
  }
}
