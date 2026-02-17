import { ApiError } from '@errors/api-error'
import { INVALID_MEETING_DATE } from '@messages/responses/meeting-responses/4xx'

export class InvalidMeetingDateError extends ApiError {
  constructor() {
    super(INVALID_MEETING_DATE)
  }
}
