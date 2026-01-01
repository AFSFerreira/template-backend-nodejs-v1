import { ApiError } from '@errors/api-error'
import { MEETING_BANNER_PERSIST_ERROR } from '@messages/responses/meeting-responses'

export class MeetingBannerPersistError extends ApiError {
  constructor() {
    super(MEETING_BANNER_PERSIST_ERROR)
  }
}
