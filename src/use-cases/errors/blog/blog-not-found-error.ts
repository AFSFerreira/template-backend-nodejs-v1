import { BLOG_NOT_FOUND } from '@messages/responses'
import { ApiError } from '../api-error'

export class BlogNotFoundError extends ApiError {
  constructor() {
    super(BLOG_NOT_FOUND)
  }
}
