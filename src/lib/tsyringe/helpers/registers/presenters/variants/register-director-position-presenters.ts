import type { DependencyContainer } from 'tsyringe'
import { DirectorPositionDefaultPresenter } from '@http/presenters/director-position/director-position-default.presenter'
import { registerPresenter } from '@lib/tsyringe/helpers/register-presenter'
import { tsyringeTokens } from '@lib/tsyringe/helpers/tokens'

export function registerDirectorPositionPresenters(container: DependencyContainer) {
  registerPresenter({
    contextKey: tsyringeTokens.presenters.directorPosition.directorPositionDefault,
    container,
    target: DirectorPositionDefaultPresenter,
  })
}
