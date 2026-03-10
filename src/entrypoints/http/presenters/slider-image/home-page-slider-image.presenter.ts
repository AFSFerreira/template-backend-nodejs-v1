import type { HomePageSliderImagePresenterInput } from '@custom-types/http/presenter/slider-image/home-page-slider-image'
import type { HTTPSliderImage } from '@custom-types/http/presenter/slider-image/slider-image-default'
import { buildSliderImageUrl } from '@services/builders/urls/build-slider-image-url'

export const HomePageSliderImagePresenter = {
  toHTTP(input: HomePageSliderImagePresenterInput): HTTPSliderImage {
    return {
      id: input.publicId,
      image: buildSliderImageUrl(input.image, 'home-page'),
      link: input.link,
      isActive: input.isActive,
      order: input.order,
    }
  },

  toHTTPList(inputs: HomePageSliderImagePresenterInput[]): HTTPSliderImage[] {
    return inputs.map(this.toHTTP)
  },
}
