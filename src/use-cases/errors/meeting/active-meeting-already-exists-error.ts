import { ApiError } from '@errors/api-error'
import { ACTIVE_MEETING_ALREADY_EXISTS } from '@messages/responses/meeting-responses.ts/4xx'

export class ActiveMeetingAlreadyExistsError extends ApiError {
  constructor() {
    super(ACTIVE_MEETING_ALREADY_EXISTS)
  }
}
