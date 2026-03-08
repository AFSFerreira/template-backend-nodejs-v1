import { ApiError } from '@errors/api-error'
import { CURRENT_USER_IS_NOT_ADMIN } from '@messages/responses/user-responses/4xx'

export class CurrentUserIsNotAdminError extends ApiError {
  constructor() {
    super(CURRENT_USER_IS_NOT_ADMIN)
  }
}
