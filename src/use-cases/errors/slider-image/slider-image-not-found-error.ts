import { ApiError } from '@errors/api-error'
import { SLIDER_IMAGE_NOT_FOUND } from '@messages/responses/slider-image-responses.ts/4xx'

export class SliderImageNotFoundError extends ApiError {
  constructor() {
    super(SLIDER_IMAGE_NOT_FOUND)
  }
}
