import type { IPresenterStrategy } from '@custom-types/custom/presenter-strategy'
import type { HTTPSliderImage } from '@custom-types/presenter/slider-image/slider-image-default'
import type { SliderImage } from '@prisma/client'
import { tokens } from '@lib/tsyringe/helpers/tokens'
import { RegisterPresenter } from '@presenters/presenter-registry'
import { buildSliderImageUrl } from '@services/builders/urls/build-slider-image-url'

@RegisterPresenter(tokens.presenters.sliderImageHomePage)
export class HomePageSliderImagePresenter implements IPresenterStrategy<SliderImage, HTTPSliderImage> {
  public toHTTP(input: SliderImage): HTTPSliderImage {
    return {
      id: input.publicId,
      image: buildSliderImageUrl(input.image, 'home-page'),
      link: input.link,
      isActive: input.isActive,
      order: input.order,
    }
  }
}
