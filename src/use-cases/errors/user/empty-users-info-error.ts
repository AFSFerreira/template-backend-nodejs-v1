import { ApiError } from '@errors/api-error'
import { NO_USERS_AVAILABLE } from '@messages/responses/user-responses.ts/2xx'

export class EmptyUsersInfoError extends ApiError {
  constructor() {
    super(NO_USERS_AVAILABLE)
  }
}
