import { ApiError } from '@errors/api-error'
import { SLIDER_IMAGE_INVALID_ORDER } from '@messages/responses/slider-image-responses.ts/4xx'

export class SliderImageInvalidOrderError extends ApiError {
  constructor() {
    super(SLIDER_IMAGE_INVALID_ORDER)
  }
}
