import type { DependencyContainer } from 'tsyringe'
import { registerPresenter } from '@lib/tsyringe/helpers/register-presenter'
import { tokens } from '@lib/tsyringe/helpers/tokens'
import { DirectorPositionDefaultPresenter } from '@presenters/variants/director-position/director-position-default.presenter'

export function registerDirectorPositionPresenters(container: DependencyContainer) {
  registerPresenter({
    contextKey: tokens.presenters.directorPosition.directorPositionDefault,
    container,
    target: DirectorPositionDefaultPresenter,
  })
}
