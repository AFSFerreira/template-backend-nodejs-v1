import { ApiError } from '@errors/api-error'
import { GUEST_ALREADY_REGISTERED_IN_MEETING } from '@messages/responses/meeting-responses'

export class GuestAlreadyRegisteredInMeetingError extends ApiError {
  constructor() {
    super(GUEST_ALREADY_REGISTERED_IN_MEETING)
  }
}
