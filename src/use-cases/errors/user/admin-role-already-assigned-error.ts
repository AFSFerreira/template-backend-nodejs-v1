import { ApiError } from '@errors/api-error'
import { ADMIN_ROLE_ALREADY_ASSIGNED } from '@messages/responses/user-responses.ts/4xx'

export class AdminRoleAlreadyAssignedError extends ApiError {
  constructor() {
    super(ADMIN_ROLE_ALREADY_ASSIGNED)
  }
}
