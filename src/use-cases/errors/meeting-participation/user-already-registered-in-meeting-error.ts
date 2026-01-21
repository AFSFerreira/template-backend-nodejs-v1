import { ApiError } from '@errors/api-error'
import { USER_ALREADY_REGISTERED_IN_MEETING } from '@messages/responses/meeting-responses.ts/4xx'

export class UserAlreadyRegisteredInMeetingError extends ApiError {
  constructor() {
    super(USER_ALREADY_REGISTERED_IN_MEETING)
  }
}
