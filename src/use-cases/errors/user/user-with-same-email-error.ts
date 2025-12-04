import { ApiError } from '@errors/api-error'
import { USER_WITH_SAME_EMAIL } from '@messages/responses/user-responses'

export class UserWithSameEmail extends ApiError {
  constructor() {
    super(USER_WITH_SAME_EMAIL)
  }
}
