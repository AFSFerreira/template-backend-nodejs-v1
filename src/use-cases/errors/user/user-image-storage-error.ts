import { ApiError } from '@errors/api-error'
import { USER_IMAGE_PROCESSING_ERROR } from '@messages/responses/user-responses.ts/5xx'

export class UserImageStorageError extends ApiError {
  constructor() {
    super(USER_IMAGE_PROCESSING_ERROR)
  }
}
