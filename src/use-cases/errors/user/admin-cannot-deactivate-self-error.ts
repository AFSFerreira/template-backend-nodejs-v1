import { ApiError } from '@errors/api-error'
import { ADMIN_CANNOT_DEACTIVATE_SELF } from '@messages/responses/user-responses/4xx'

export class AdminCannotDeactivateSelfError extends ApiError {
  constructor() {
    super(ADMIN_CANNOT_DEACTIVATE_SELF)
  }
}
