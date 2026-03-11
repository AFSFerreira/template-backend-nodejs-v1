import type { IPresenterStrategy } from '@custom-types/custom/presenter-strategy'
import type {
  HTTPSliderImage,
  SliderImageDefaultPresenterInput,
} from '@custom-types/http/presenter/slider-image/slider-image-default'
import { SliderImageUrlBuilderService } from '@services/builders/urls/build-slider-image-url'
import { inject, singleton } from 'tsyringe'

@singleton()
export class SliderImageDefaultPresenter
  implements IPresenterStrategy<SliderImageDefaultPresenterInput, HTTPSliderImage>
{
  constructor(
    @inject(SliderImageUrlBuilderService)
    private readonly sliderImageUrlBuilderService: SliderImageUrlBuilderService,
  ) {}

  public toHTTP(input: SliderImageDefaultPresenterInput): HTTPSliderImage {
    return {
      id: input.publicId,
      image: this.sliderImageUrlBuilderService.buildImageUrl(input.image, 'home-page'),
      link: input.link,
      isActive: input.isActive,
      order: input.order,
    }
  }

  toHTTPList(inputs: SliderImageDefaultPresenterInput[]): HTTPSliderImage[] {
    return inputs.map((input) => this.toHTTP(input))
  }
}
