import type {
  HTTPSliderImage,
  SliderImageDefaultPresenterInput,
} from '@custom-types/http/presenter/slider-image/slider-image-default'
import { buildSliderImageUrl } from '@services/builders/urls/build-slider-image-url'

export const SliderImageDefaultPresenter = {
  toHTTP(input: SliderImageDefaultPresenterInput): HTTPSliderImage {
    return {
      id: input.publicId,
      image: buildSliderImageUrl(input.image, 'home-page'),
      link: input.link,
      isActive: input.isActive,
      order: input.order,
    }
  },

  toHTTPList(inputs: SliderImageDefaultPresenterInput[]): HTTPSliderImage[] {
    return inputs.map(this.toHTTP)
  },
}
