import { ApiError } from '@errors/api-error'
import { MEETING_ENROLLMENT_NOT_FOUND } from '@messages/responses/meeting-enrollment-responses.ts/4xx'

export class MeetingEnrollmentNotFoundError extends ApiError {
  constructor() {
    super(MEETING_ENROLLMENT_NOT_FOUND)
  }
}
