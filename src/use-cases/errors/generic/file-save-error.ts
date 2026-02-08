import { ApiError } from '@errors/api-error'
import { FILE_SAVE_ERROR } from '@messages/responses/common-responses/5xx'

export class FileSaveError extends ApiError {
  constructor() {
    super(FILE_SAVE_ERROR)
  }
}
