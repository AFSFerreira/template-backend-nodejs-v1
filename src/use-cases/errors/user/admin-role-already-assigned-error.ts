import { ApiError } from '@errors/api-error'
import { ADMIN_ROLE_ALREADY_ASSIGNED } from '@messages/responses/user-responses'

export class AdminRoleAlreadyAssignedError extends ApiError {
  constructor() {
    super(ADMIN_ROLE_ALREADY_ASSIGNED)
  }
}
