import { USER_IMAGE_PROCESSING_ERROR } from '@messages/responses'
import { ApiError } from '../api-error'

export class UserImageStorageError extends ApiError {
  constructor() {
    super(USER_IMAGE_PROCESSING_ERROR)
  }
}
