import { ApiError } from '@errors/api-error'
import { STATUTE_FILE_READ_ERROR } from '@messages/responses/document-management-responses'

export class StatuteFileReadError extends ApiError {
  constructor() {
    super(STATUTE_FILE_READ_ERROR)
  }
}
