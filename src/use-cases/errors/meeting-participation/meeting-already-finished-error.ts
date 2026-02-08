import { ApiError } from '@errors/api-error'
import { MEETING_ALREADY_FINISHED } from '@messages/responses/meeting-responses/4xx'

export class MeetingAlreadyFinishedError extends ApiError {
  constructor() {
    super(MEETING_ALREADY_FINISHED)
  }
}
