import { ApiError } from '@errors/api-error'
import { ADMIN_CANNOT_UPDATE_OWN_ROLE } from '@messages/responses/user-responses/4xx'

export class AdminCannotUpdateOwnRoleError extends ApiError {
  constructor() {
    super(ADMIN_CANNOT_UPDATE_OWN_ROLE)
  }
}
