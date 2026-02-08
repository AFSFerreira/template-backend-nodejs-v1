import { ApiError } from '@errors/api-error'
import { ADMIN_CANNOT_BE_INACTIVATED } from '@messages/responses/user-responses.ts/4xx'

export class AdminCannotBeInactivatedError extends ApiError {
  constructor() {
    super(ADMIN_CANNOT_BE_INACTIVATED)
  }
}
