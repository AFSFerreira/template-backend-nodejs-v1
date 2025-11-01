import { NO_USERS_AVAILABLE } from '@messages/responses'
import { ApiError } from '../api-error'

export class EmptyUsersInfoError extends ApiError {
  constructor() {
    super(NO_USERS_AVAILABLE)
  }
}
