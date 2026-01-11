import type { DependencyContainer } from 'tsyringe'
import { registerPresenter } from '@lib/tsyringe/helpers/register-presenter'
import { tokens } from '@lib/tsyringe/helpers/tokens'
import { InstitutionDefaultPresenter } from '@presenters/institution/institution-default.presenter'
import { InstitutionWithUsersCountPresenter } from '@presenters/institution/institution-with-users-count.presenter'

export function registerInstitutionPresenters(container: DependencyContainer) {
  registerPresenter({
    contextKey: tokens.presenters.institution.institutionDefault,
    container,
    target: InstitutionDefaultPresenter,
  })

  registerPresenter({
    contextKey: tokens.presenters.institution.institutionWithUsersCount,
    container,
    target: InstitutionWithUsersCountPresenter,
  })
}
