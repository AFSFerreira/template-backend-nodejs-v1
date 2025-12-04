import { ApiError } from '@errors/api-error'
import { INVALID_CREDENTIALS } from '@messages/responses/user-responses'

export class InvalidCredentialsError extends ApiError {
  constructor() {
    super(INVALID_CREDENTIALS)
  }
}
