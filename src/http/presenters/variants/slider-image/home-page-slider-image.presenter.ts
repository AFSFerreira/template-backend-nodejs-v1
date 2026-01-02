import type { IPresenterStrategy } from '@custom-types/custom/presenter-strategy'
import type { HTTPSliderImage } from '@custom-types/presenter/slider-image/slider-image-default'
import type { SliderImage } from '@prisma/client'
import { tokens } from '@lib/tsyringe/helpers/tokens'
import { RegisterPresenter } from '@presenters/presenter-registry'

@RegisterPresenter(tokens.presenters.sliderImageHomePage)
export class HomePageSliderImagePresenter implements IPresenterStrategy<SliderImage, HTTPSliderImage> {
  public toHTTP(input: SliderImage): HTTPSliderImage {
    return {
      id: input.publicId,
      image: input.image,
      link: input.link,
      isActive: input.isActive,
      order: input.order,
    }
  }
}
