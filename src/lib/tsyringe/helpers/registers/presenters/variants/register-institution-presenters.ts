import type { DependencyContainer } from 'tsyringe'
import { InstitutionDefaultPresenter } from '@http/presenters/institution/institution-default.presenter'
import { InstitutionWithUsersCountPresenter } from '@http/presenters/institution/institution-with-users-count.presenter'
import { registerPresenter } from '@lib/tsyringe/helpers/register-presenter'
import { tsyringeTokens } from '@lib/tsyringe/helpers/tokens'

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
