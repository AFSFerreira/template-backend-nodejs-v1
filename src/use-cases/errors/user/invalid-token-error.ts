import { ApiError } from '@errors/api-error'
import { INVALID_OR_EXPIRED_TOKEN } from '@messages/responses/user-responses/4xx'

export class InvalidTokenError extends ApiError {
  constructor() {
    super(INVALID_OR_EXPIRED_TOKEN)
  }
}
