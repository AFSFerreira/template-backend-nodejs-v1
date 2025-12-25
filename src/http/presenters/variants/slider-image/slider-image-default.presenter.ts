import type { IPresenterStrategy } from '@custom-types/custom/presenter-strategy'
import type { HTTPSliderImage } from '@custom-types/presenter/slider-image/slider-image-default'
import type { SliderImage } from '@prisma/client'
import { SLIDER_IMAGE_DEFAULT_PRESENTER_KEY } from '@constants/presenters-constants'
import { STATIC_SLIDER_IMAGE_ROUTE } from '@constants/static-routes-constants'
import { getBackendBaseUrl } from '@lib/logger/helpers/get-backend-base-url'
import { RegisterPresenter } from '@presenters/presenter-registry'
import urlJoin from 'url-join'

@RegisterPresenter(SLIDER_IMAGE_DEFAULT_PRESENTER_KEY)
export class SliderImageDefaultPresenter implements IPresenterStrategy<SliderImage, HTTPSliderImage> {
  public toHTTP(input: SliderImage): HTTPSliderImage {
    const backendBaseUrl = getBackendBaseUrl()

    return {
      id: input.publicId,
      image: urlJoin(backendBaseUrl, STATIC_SLIDER_IMAGE_ROUTE, input.image),
      link: input.link,
      isActive: input.isActive,
      order: input.order,
    }
  }
}
