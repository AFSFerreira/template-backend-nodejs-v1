import { ApiError } from '@errors/api-error'
import { MEETING_ENROLLMENT_NOT_FOUND } from '@messages/responses/meeting-enrollment-responses'

export class MeetingEnrollmentNotFoundError extends ApiError {
  constructor() {
    super(MEETING_ENROLLMENT_NOT_FOUND)
  }
}
