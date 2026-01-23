import type { DependencyContainer } from 'tsyringe'
import { registerPresenter } from '@lib/tsyringe/helpers/register-presenter'
import { tsyringeTokens } from '@lib/tsyringe/helpers/tokens'
import { HomePageSliderImagePresenter } from '@presenters/slider-image/home-page-slider-image.presenter'
import { SliderImageDefaultPresenter } from '@presenters/slider-image/slider-image-default.presenter'

export function registerSliderImagePresenters(container: DependencyContainer) {
  registerPresenter({
    contextKey: tsyringeTokens.presenters.sliderImage.sliderImageDefault,
    container,
    target: SliderImageDefaultPresenter,
  })

  registerPresenter({
    contextKey: tsyringeTokens.presenters.sliderImage.sliderImageHomePage,
    container,
    target: HomePageSliderImagePresenter,
  })
}
