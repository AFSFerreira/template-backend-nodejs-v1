import { ApiError } from '@errors/api-error'
import { USER_WITH_SAME_SECONDARY_EMAIL } from '@messages/responses/user-responses/4xx'

export class UserWithSameSecondaryEmail extends ApiError {
  constructor() {
    super(USER_WITH_SAME_SECONDARY_EMAIL)
  }
}
