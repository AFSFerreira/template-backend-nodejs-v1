import { USER_ALREADY_REGISTERED_IN_MEETING } from '@messages/responses'
import { ApiError } from '../api-error'

export class UserAlreadyRegisteredInMeetingError extends ApiError {
  constructor() {
    super(USER_ALREADY_REGISTERED_IN_MEETING)
  }
}
