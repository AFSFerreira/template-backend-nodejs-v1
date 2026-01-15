import type { DependencyContainer } from 'tsyringe'
import { registerPresenter } from '@lib/tsyringe/helpers/register-presenter'
import { tokens } from '@lib/tsyringe/helpers/tokens'
import { AcademicPublicationDefaultPresenter } from '@presenters/academic-publication/academic-publication-default.presenter'
import { AcademicPublicationFilteredPresenter } from '@presenters/academic-publication/academic-publication-simplified.presenter'

export function registerAcademicPublicationPresenters(container: DependencyContainer) {
  registerPresenter({
    contextKey: tokens.presenters.academicPublication.academicPublicationDefault,
    container,
    target: AcademicPublicationDefaultPresenter,
  })

  registerPresenter({
    contextKey: tokens.presenters.academicPublication.academicPublicationSimplified,
    container,
    target: AcademicPublicationFilteredPresenter,
  })
}
