import { USER_ALREADY_EXISTS } from '@messages/response'
import { ApiError } from '../api-error'

export class UserAlreadyExistsError extends ApiError {
  constructor(message?: string) {
    super(USER_ALREADY_EXISTS.status, message ? { ...USER_ALREADY_EXISTS.body, message } : USER_ALREADY_EXISTS.body)
  }
}
