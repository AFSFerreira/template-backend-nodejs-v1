import { ApiError } from '@errors/api-error'
import { IMAGE_TOO_BIG } from '@messages/responses/user-responses'

export class ImageTooBigError extends ApiError {
  constructor() {
    super(IMAGE_TOO_BIG)
  }
}
