import { MEETING_NOT_FOUND } from '@messages/responses'
import { ApiError } from '../api-error'

export class MeetingNotFoundError extends ApiError {
  constructor() {
    super(MEETING_NOT_FOUND)
  }
}
