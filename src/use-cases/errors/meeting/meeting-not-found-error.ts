import { ApiError } from '@errors/api-error'
import { MEETING_NOT_FOUND } from '@messages/responses/meeting-responses'

export class MeetingNotFoundError extends ApiError {
  constructor() {
    super(MEETING_NOT_FOUND)
  }
}
