import { ApiError } from '@errors/api-error'
import { CANNOT_TRANSFER_ADMIN_TO_SELF } from '@messages/responses/user-responses.ts/4xx'

export class CannotTransferAdminToSelfError extends ApiError {
  constructor() {
    super(CANNOT_TRANSFER_ADMIN_TO_SELF)
  }
}
