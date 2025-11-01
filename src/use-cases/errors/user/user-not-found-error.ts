import { USER_NOT_FOUND } from '@messages/responses'
import { ApiError } from '../api-error'

export class UserNotFoundError extends ApiError {
  constructor() {
    super(USER_NOT_FOUND)
  }
}
