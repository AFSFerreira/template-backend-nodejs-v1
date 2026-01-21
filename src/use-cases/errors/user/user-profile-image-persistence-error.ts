import { ApiError } from '@errors/api-error'
import { USER_PROFILE_IMAGE_PERSISTENCE_ERROR } from '@messages/responses/user-responses.ts/5xx'

export class UserProfileImagePersistenceError extends ApiError {
  constructor() {
    super(USER_PROFILE_IMAGE_PERSISTENCE_ERROR)
  }
}
