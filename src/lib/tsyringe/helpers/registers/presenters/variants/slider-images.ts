import type { DependencyContainer } from 'tsyringe'
import { registerPresenter } from '@lib/tsyringe/helpers/register-presenter'
import { tokens } from '@lib/tsyringe/helpers/tokens'
import { HomePageSliderImagePresenter } from '@presenters/variants/slider-image/home-page-slider-image.presenter'
import { SliderImageDefaultPresenter } from '@presenters/variants/slider-image/slider-image-default.presenter'

export function registerSliderImagePresenters(container: DependencyContainer) {
  registerPresenter({
    contextKey: tokens.presenters.sliderImage.sliderImageDefault,
    container,
    target: SliderImageDefaultPresenter,
  })

  registerPresenter({
    contextKey: tokens.presenters.sliderImage.sliderImageHomePage,
    container,
    target: HomePageSliderImagePresenter,
  })
}
