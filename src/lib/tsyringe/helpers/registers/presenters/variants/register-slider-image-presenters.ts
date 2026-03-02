import type { DependencyContainer } from 'tsyringe'
import { HomePageSliderImagePresenter } from '@http/presenters/slider-image/home-page-slider-image.presenter'
import { SliderImageDefaultPresenter } from '@http/presenters/slider-image/slider-image-default.presenter'
import { registerPresenter } from '@lib/tsyringe/helpers/register-presenter'
import { tsyringeTokens } from '@lib/tsyringe/helpers/tokens'

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
