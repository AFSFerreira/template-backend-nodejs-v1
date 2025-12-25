import { ApiError } from '@errors/api-error'
import { SLIDER_IMAGE_LIMIT_REACHED } from '@messages/responses/slider-image-responses'

export class SliderImageLimitReachedError extends ApiError {
  constructor() {
    super(SLIDER_IMAGE_LIMIT_REACHED)
  }
}
