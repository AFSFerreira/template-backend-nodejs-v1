import { ApiError } from '@errors/api-error'
import { INVALID_CREDENTIALS } from '@messages/responses/user-responses/4xx'

export class InvalidCredentialsError extends ApiError {
  constructor() {
    super(INVALID_CREDENTIALS)
  }
}
