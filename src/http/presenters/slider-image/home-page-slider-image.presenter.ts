import type { IPresenterStrategy } from '@custom-types/custom/presenter-strategy'
import type { HTTPSliderImage } from '@custom-types/presenter/slider-image/slider-image-default'
import type { SliderImage } from '@prisma/client'

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
