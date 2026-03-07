import type { IPresenterStrategy } from '@custom-types/custom/presenter-strategy'
import type {
  HTTPSliderImage,
  SliderImageDefaultPresenterInput,
} from '@custom-types/http/presenter/slider-image/slider-image-default'
import { buildSliderImageUrl } from '@services/builders/urls/build-slider-image-url'

export class SliderImageDefaultPresenter
  implements IPresenterStrategy<SliderImageDefaultPresenterInput, HTTPSliderImage>
{
  public toHTTP(input: SliderImageDefaultPresenterInput): HTTPSliderImage {
    return {
      id: input.publicId,
      image: buildSliderImageUrl(input.image, 'home-page'),
      link: input.link,
      isActive: input.isActive,
      order: input.order,
    }
  }
}
