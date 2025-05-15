import { ApiError } from '@errors/api-error'
import { PASSWORD_RESET_IF_USER_EXISTS } from '@messages/responses/user-responses/2xx'

export class UserNotFoundForPasswordResetError extends ApiError {
  constructor() {
    super(PASSWORD_RESET_IF_USER_EXISTS)
  }
}
