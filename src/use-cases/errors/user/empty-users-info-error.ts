import { NO_USERS_AVAILABLE } from '@messages/errors'
import { ApiError } from '../api-error'

export class EmptyUsersInfoError extends ApiError {
  constructor() {
    super(NO_USERS_AVAILABLE.status, NO_USERS_AVAILABLE.body)
  }
}
