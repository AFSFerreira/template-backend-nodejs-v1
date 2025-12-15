import { ApiError } from '@errors/api-error'
import { FILE_TOO_BIG } from '@messages/responses/newsletter-responses'

export class FileTooBigError extends ApiError {
  constructor() {
    super(FILE_TOO_BIG)
  }
}
