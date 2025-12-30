import type { IPresenterStrategy } from '@custom-types/custom/presenter-strategy'
import type { HTTPSliderImage } from '@custom-types/presenter/slider-image/slider-image-default'
import type { SliderImage } from '@prisma/client'
import { SLIDER_IMAGE_DEFAULT_PRESENTER_KEY } from '@constants/presenters-constants'
import { RegisterPresenter } from '@presenters/presenter-registry'
import { buildSliderImageUrl } from '@services/builders/urls/build-slider-image-url'

@RegisterPresenter(SLIDER_IMAGE_DEFAULT_PRESENTER_KEY)
export class SliderImageDefaultPresenter implements IPresenterStrategy<SliderImage, HTTPSliderImage> {
  public toHTTP(input: SliderImage): HTTPSliderImage {
    return {
      id: input.publicId,
      image: buildSliderImageUrl(input.image),
      link: input.link,
      isActive: input.isActive,
      order: input.order,
    }
  }
}
