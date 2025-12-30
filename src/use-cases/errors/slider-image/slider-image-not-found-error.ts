import { ApiError } from '@errors/api-error'
import { SLIDER_IMAGE_NOT_FOUND } from '@messages/responses/slider-image-responses'

export class SliderImageNotFoundError extends ApiError {
  constructor() {
    super(SLIDER_IMAGE_NOT_FOUND)
  }
}
