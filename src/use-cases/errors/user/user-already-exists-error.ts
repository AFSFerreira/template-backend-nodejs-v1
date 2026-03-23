import { ApiError } from '@errors/api-error'
import { USER_ALREADY_EXISTS } from '@messages/responses/user-responses/4xx'

export class UserAlreadyExistsError extends ApiError {
  constructor() {
    super(USER_ALREADY_EXISTS)
  }
}
