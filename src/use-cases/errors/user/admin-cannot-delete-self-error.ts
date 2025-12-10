import { ApiError } from '@errors/api-error'
import { ADMIN_CANNOT_DELETE_SELF } from '@messages/responses/user-responses'

export class AdminCannotDeleteSelfError extends ApiError {
  constructor() {
    super(ADMIN_CANNOT_DELETE_SELF)
  }
}
