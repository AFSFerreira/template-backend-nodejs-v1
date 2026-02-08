import { ApiError } from '@errors/api-error'
import { HOME_PAGE_SLIDER_IMAGE_PERSIST_FAILED } from '@messages/responses/slider-image-responses/5xx'

export class HomePageSliderImagePersistError extends ApiError {
  constructor() {
    super(HOME_PAGE_SLIDER_IMAGE_PERSIST_FAILED)
  }
}
