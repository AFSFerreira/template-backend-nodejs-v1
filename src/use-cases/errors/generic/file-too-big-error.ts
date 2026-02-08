import { ApiError } from '@errors/api-error'
import { DOCUMENT_TOO_BIG } from '@messages/responses/document-management-responses/4xx'

export class FileTooBigError extends ApiError {
  constructor() {
    super(DOCUMENT_TOO_BIG)
  }
}
