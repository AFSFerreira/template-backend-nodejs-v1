import type { IPresenterStrategy } from '@custom-types/custom/presenter-strategy'
import type { HomePageSliderImagePresenterInput } from '@custom-types/http/presenter/slider-image/home-page-slider-image'
import type { HTTPSliderImage } from '@custom-types/http/presenter/slider-image/slider-image-default'
import { SliderImageUrlBuilderService } from '@services/builders/urls/build-slider-image-url'
import { inject, singleton } from 'tsyringe'

@singleton()
export class HomePageSliderImagePresenter
  implements IPresenterStrategy<HomePageSliderImagePresenterInput, HTTPSliderImage>
{
  constructor(
    @inject(SliderImageUrlBuilderService)
    private readonly sliderImageUrlBuilderService: SliderImageUrlBuilderService,
  ) {}

  public toHTTP(input: HomePageSliderImagePresenterInput): HTTPSliderImage {
    return {
      id: input.publicId,
      image: this.sliderImageUrlBuilderService.buildImageUrl(input.image, 'home-page'),
      link: input.link,
      isActive: input.isActive,
      order: input.order,
    }
  }

  toHTTPList(inputs: HomePageSliderImagePresenterInput[]): HTTPSliderImage[] {
    return inputs.map((input) => this.toHTTP(input))
  }
}
