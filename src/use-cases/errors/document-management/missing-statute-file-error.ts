import { ApiError } from '@errors/api-error'
import { MISSING_STATUTE_FILE } from '@messages/responses/document-management-responses'

export class MissingStatuteFileError extends ApiError {
  constructor() {
    super(MISSING_STATUTE_FILE)
  }
}
