import { ApiError } from '@errors/api-error'
import { TOO_MANY_REQUESTS } from '@messages/responses/common-responses/4xx'

export class RateLimitError extends ApiError {
  constructor() {
    super(TOO_MANY_REQUESTS)
  }
}
