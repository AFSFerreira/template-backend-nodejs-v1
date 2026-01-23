import type { DependencyContainer } from 'tsyringe'
import { registerPresenter } from '@lib/tsyringe/helpers/register-presenter'
import { tsyringeTokens } from '@lib/tsyringe/helpers/tokens'
import { DirectorPositionDefaultPresenter } from '@presenters/director-position/director-position-default.presenter'

export function registerDirectorPositionPresenters(container: DependencyContainer) {
  registerPresenter({
    contextKey: tsyringeTokens.presenters.directorPosition.directorPositionDefault,
    container,
    target: DirectorPositionDefaultPresenter,
  })
}
