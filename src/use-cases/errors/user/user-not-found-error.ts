import { ApiError } from '@errors/api-error'
import { USER_NOT_FOUND } from '@messages/responses/user-responses/4xx'

export class UserNotFoundError extends ApiError {
  constructor() {
    super(USER_NOT_FOUND)
  }
}
