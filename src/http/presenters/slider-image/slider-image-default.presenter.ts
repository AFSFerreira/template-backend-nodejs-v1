import type { IPresenterStrategy } from '@custom-types/custom/presenter-strategy'
import type {
  HTTPSliderImage,
  SliderImageDefaultPresenterInput,
} from '@custom-types/http/presenter/slider-image/slider-image-default'

export class SliderImageDefaultPresenter
  implements IPresenterStrategy<SliderImageDefaultPresenterInput, HTTPSliderImage>
{
  public toHTTP(input: SliderImageDefaultPresenterInput): HTTPSliderImage {
    return {
      id: input.publicId,
      image: input.image,
      link: input.link,
      isActive: input.isActive,
      order: input.order,
    }
  }
}
