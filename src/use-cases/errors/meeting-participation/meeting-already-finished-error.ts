import { MEETING_ALREADY_FINISHED } from '@messages/responses'
import { ApiError } from '../api-error'

export class MeetingAlreadyFinishedError extends ApiError {
  constructor() {
    super(MEETING_ALREADY_FINISHED)
  }
}
