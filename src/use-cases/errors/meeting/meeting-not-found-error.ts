import { MEETING_NOT_FOUND } from '@messages/response'
import { ResourceNotFoundError } from '../generic/resource-not-found-error'

export class MeetingNotFoundError extends ResourceNotFoundError {
  constructor() {
    super(MEETING_NOT_FOUND.body.message)
  }
}
