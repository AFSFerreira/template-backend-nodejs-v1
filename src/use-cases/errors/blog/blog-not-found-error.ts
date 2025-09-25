import { BLOG_NOT_FOUND } from '@messages/response'
import { ResourceNotFoundError } from '../generic/resource-not-found-error'

export class BlogNotFoundError extends ResourceNotFoundError {
  constructor() {
    super(BLOG_NOT_FOUND.body.message)
  }
}
