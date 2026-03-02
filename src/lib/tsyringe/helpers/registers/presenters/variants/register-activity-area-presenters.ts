import type { DependencyContainer } from 'tsyringe'
import { ActivityAreaDefaultPresenter } from '@http/presenters/activity-area/activity-area-default.presenter'
import { ActivityAreaWithAcademicPublicationsCountPresenter } from '@http/presenters/activity-area/activity-area-with-academic-publications-count.presenter'
import { ActivityAreaWithBlogsCountPresenter } from '@http/presenters/activity-area/activity-area-with-blogs-count.presenter'
import { registerPresenter } from '@lib/tsyringe/helpers/register-presenter'
import { tsyringeTokens } from '@lib/tsyringe/helpers/tokens'

export function registerActivityAreaPresenters(container: DependencyContainer) {
  registerPresenter({
    contextKey: tsyringeTokens.presenters.activityArea.activityAreaDefault,
    container,
    target: ActivityAreaDefaultPresenter,
  })

  registerPresenter({
    contextKey: tsyringeTokens.presenters.activityArea.activityAreaWithBlogsCount,
    container,
    target: ActivityAreaWithBlogsCountPresenter,
  })

  registerPresenter({
    contextKey: tsyringeTokens.presenters.activityArea.activityAreaWithAcademicPublicationsCount,
    container,
    target: ActivityAreaWithAcademicPublicationsCountPresenter,
  })
}
