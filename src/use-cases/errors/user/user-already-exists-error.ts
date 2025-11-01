import { USER_ALREADY_EXISTS } from '@messages/responses'
import { ApiError } from '../api-error'

export class UserAlreadyExistsError extends ApiError {
  constructor() {
    super(USER_ALREADY_EXISTS)
  }
}
