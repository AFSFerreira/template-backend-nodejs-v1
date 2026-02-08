import { ApiError } from '@errors/api-error'
import { ELECTION_NOTICE_FILE_READ_ERROR } from '@messages/responses/document-management-responses/5xx'

export class ElectionNoticeFileReadError extends ApiError {
  constructor() {
    super(ELECTION_NOTICE_FILE_READ_ERROR)
  }
}
