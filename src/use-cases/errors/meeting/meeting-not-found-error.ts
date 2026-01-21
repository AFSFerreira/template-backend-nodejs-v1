import { ApiError } from '@errors/api-error'
import { MEETING_NOT_FOUND } from '@messages/responses/meeting-responses.ts/4xx'

export class MeetingNotFoundError extends ApiError {
  constructor() {
    super(MEETING_NOT_FOUND)
  }
}
