import type { DependencyContainer } from 'tsyringe'
import { registerPresenter } from '@lib/tsyringe/helpers/register-presenter'
import { tsyringeTokens } from '@lib/tsyringe/helpers/tokens'
import { InstitutionDefaultPresenter } from '@presenters/institution/institution-default.presenter'
import { InstitutionWithUsersCountPresenter } from '@presenters/institution/institution-with-users-count.presenter'

export function registerInstitutionPresenters(container: DependencyContainer) {
  registerPresenter({
    contextKey: tsyringeTokens.presenters.institution.institutionDefault,
    container,
    target: InstitutionDefaultPresenter,
  })

  registerPresenter({
    contextKey: tsyringeTokens.presenters.institution.institutionWithUsersCount,
    container,
    target: InstitutionWithUsersCountPresenter,
  })
}
