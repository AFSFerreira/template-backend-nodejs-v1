import { USER_ALREADY_HAS_ADDRESS } from '@messages/errors'
import { ApiError } from '../api-error'

export class UserAlreadyHasAddressError extends ApiError {
  constructor() {
    super(USER_ALREADY_HAS_ADDRESS.status, USER_ALREADY_HAS_ADDRESS.body)
  }
}
