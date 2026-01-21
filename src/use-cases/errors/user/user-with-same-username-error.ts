import { ApiError } from '@errors/api-error'
import { USER_WITH_SAME_USERNAME } from '@messages/responses/user-responses.ts/4xx'

export class UserWithSameUsername extends ApiError {
  constructor() {
    super(USER_WITH_SAME_USERNAME)
  }
}
