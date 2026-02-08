import { ApiError } from '@errors/api-error'
import { MEETING_DATE_CONFLICT } from '@messages/responses/meeting-responses/4xx'

export class MeetingDateConflictError extends ApiError {
  constructor() {
    super(MEETING_DATE_CONFLICT)
  }
}
