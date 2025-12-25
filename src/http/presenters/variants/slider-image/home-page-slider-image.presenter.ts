import type { IPresenterStrategy } from '@custom-types/custom/presenter-strategy'
import type { HTTPSliderImage } from '@custom-types/presenter/slider-image/slider-image-default'
import type { SliderImage } from '@prisma/client'
import { HOME_PAGE_SLIDER_IMAGE_PRESENTER_KEY } from '@constants/presenters-constants'
import { STATIC_SLIDER_IMAGE_ROUTE } from '@constants/static-routes-constants'
import { getBackendBaseUrl } from '@lib/logger/helpers/get-backend-base-url'
import { RegisterPresenter } from '@presenters/presenter-registry'
import urlJoin from 'url-join'

@RegisterPresenter(HOME_PAGE_SLIDER_IMAGE_PRESENTER_KEY)
export class HomePageSliderImagePresenter implements IPresenterStrategy<SliderImage, HTTPSliderImage> {
  public toHTTP(input: SliderImage): HTTPSliderImage {
    const backendBaseUrl = getBackendBaseUrl()

    return {
      id: input.publicId,
      image: urlJoin(backendBaseUrl, STATIC_SLIDER_IMAGE_ROUTE, 'home-page', input.image),
      link: input.link,
      isActive: input.isActive,
      order: input.order,
    }
  }
}
