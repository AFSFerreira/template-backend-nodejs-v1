import { ApiError } from '@errors/api-error'
import { USER_ALREADY_HAS_ADDRESS } from '@messages/responses/user-responses'

export class UserAlreadyHasAddressError extends ApiError {
  constructor() {
    super(USER_ALREADY_HAS_ADDRESS)
  }
}
