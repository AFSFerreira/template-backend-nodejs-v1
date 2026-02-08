import { ApiError } from '@errors/api-error'
import { PASSWORD_RECOVERY_NOT_REQUESTED_BY_USER } from '@messages/responses/user-responses/4xx'

export class PasswordRecoveryNotRequestedByUserError extends ApiError {
  constructor() {
    super(PASSWORD_RECOVERY_NOT_REQUESTED_BY_USER)
  }
}
