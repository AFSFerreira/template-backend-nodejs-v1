import { IMAGE_TOO_BIG } from '@messages/errors'
import { ApiError } from '../api-error'

export class ImageTooBigError extends ApiError {
  constructor() {
    super(IMAGE_TOO_BIG.status, IMAGE_TOO_BIG.body)
  }
}
