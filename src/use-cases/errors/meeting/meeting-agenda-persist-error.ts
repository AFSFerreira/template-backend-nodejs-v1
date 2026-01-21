import { ApiError } from '@errors/api-error'
import { MEETING_AGENDA_PERSIST_ERROR } from '@messages/responses/meeting-responses.ts/5xx'

export class MeetingAgendaPersistError extends ApiError {
  constructor() {
    super(MEETING_AGENDA_PERSIST_ERROR)
  }
}
