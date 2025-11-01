import { USER_WITH_SAME_EMAIL } from '@messages/responses'
import { ApiError } from '../api-error'

export class UserWithSameEmail extends ApiError {
  constructor() {
    super(USER_WITH_SAME_EMAIL)
  }
}
