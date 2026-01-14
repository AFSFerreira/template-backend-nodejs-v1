import type { DependencyContainer } from 'tsyringe'
import { registerPresenter } from '@lib/tsyringe/helpers/register-presenter'
import { tokens } from '@lib/tsyringe/helpers/tokens'
import { ActivityAreaDefaultPresenter } from '@presenters/activity-area/activity-area-default.presenter'

export function registerActivityAreaPresenters(container: DependencyContainer) {
  registerPresenter({
    contextKey: tokens.presenters.activityArea.activityAreaDefault,
    container,
    target: ActivityAreaDefaultPresenter,
  })
}
