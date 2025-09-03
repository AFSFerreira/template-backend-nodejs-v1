import { TOO_MANY_REQUESTS } from '@messages/errors'
import { ApiError } from '../api-error'

export class RateLimitError extends ApiError {
  constructor() {
    super(TOO_MANY_REQUESTS.status, TOO_MANY_REQUESTS.body)
  }
}
