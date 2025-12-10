import { ApiError } from '@errors/api-error'
import { PROFILE_IMAGE_UPDATE_ERROR } from '@messages/responses/user-responses'

export class ProfileImageUpdateError extends ApiError {
  constructor() {
    super(PROFILE_IMAGE_UPDATE_ERROR)
  }
}
