import type { DependencyContainer } from 'tsyringe'
import { AcademicPublicationDefaultPresenter } from '@http/presenters/academic-publication/academic-publication-default.presenter'
import { AcademicPublicationFilteredPresenter } from '@http/presenters/academic-publication/academic-publication-simplified.presenter'
import { AcademicPublicationYearPresenter } from '@http/presenters/academic-publication/academic-publication-year.presenter'
import { registerPresenter } from '@lib/tsyringe/helpers/register-presenter'
import { tsyringeTokens } from '@lib/tsyringe/helpers/tokens'

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

  registerPresenter({
    contextKey: tsyringeTokens.presenters.academicPublication.academicPublicationYear,
    container,
    target: AcademicPublicationYearPresenter,
  })
}
