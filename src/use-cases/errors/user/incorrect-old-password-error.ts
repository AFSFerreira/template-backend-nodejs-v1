import { ApiError } from '@errors/api-error'
import { INCORRECT_OLD_PASSWORD } from '@messages/responses/user-responses/4xx'

export class IncorrectOldPasswordError extends ApiError {
  constructor() {
    super(INCORRECT_OLD_PASSWORD)
  }
}
