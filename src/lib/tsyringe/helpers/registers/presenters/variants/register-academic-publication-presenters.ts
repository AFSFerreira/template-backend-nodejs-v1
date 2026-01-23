import type { DependencyContainer } from 'tsyringe'
import { registerPresenter } from '@lib/tsyringe/helpers/register-presenter'
import { tsyringeTokens } from '@lib/tsyringe/helpers/tokens'
import { AcademicPublicationDefaultPresenter } from '@presenters/academic-publication/academic-publication-default.presenter'
import { AcademicPublicationFilteredPresenter } from '@presenters/academic-publication/academic-publication-simplified.presenter'

export function registerAcademicPublicationPresenters(container: DependencyContainer) {
  registerPresenter({
    contextKey: tsyringeTokens.presenters.academicPublication.academicPublicationDefault,
    container,
    target: AcademicPublicationDefaultPresenter,
  })

  registerPresenter({
    contextKey: tsyringeTokens.presenters.academicPublication.academicPublicationSimplified,
    container,
    target: AcademicPublicationFilteredPresenter,
  })
}
