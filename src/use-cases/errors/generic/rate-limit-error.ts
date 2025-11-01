import { TOO_MANY_REQUESTS } from '@messages/responses'
import { ApiError } from '../api-error'

export class RateLimitError extends ApiError {
  constructor() {
    super(TOO_MANY_REQUESTS)
  }
}
