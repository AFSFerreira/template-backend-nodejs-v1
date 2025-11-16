import { ACADEMIC_PUBLICATION_FILTERED_PRESENTER_KEY } from '@constants/presenters-constants'
import type { CustomAcademicPublicationWithSimplifiedDetails } from '@custom-types/adapter/output/custom-academic-publication-with-simplified-details-type'
import type { IPresenterStrategy } from '@custom-types/custom/presenter-strategy'
import type { HTTPAcademicPublication } from '@custom-types/presenter/academic-publication/academic-publication-default'
import { RegisterPresenter } from '@presenters/presenter-registry'

@RegisterPresenter(ACADEMIC_PUBLICATION_FILTERED_PRESENTER_KEY)
export class AcademicPublicationFilteredPresenter
  implements IPresenterStrategy<CustomAcademicPublicationWithSimplifiedDetails, HTTPAcademicPublication>
{
  toHTTP(input: CustomAcademicPublicationWithSimplifiedDetails): HTTPAcademicPublication {
    return {
      title: input.title,
      authorsName: input.authorsName,
      editionNumber: input.editionNumber,
      journalName: input.journalName,
      linkDoi: input.linkDoi,
      startPage: input.startPage,
      volume: input.volume,
      mainCategory: input.mainCategory,
      publicationYear: input.publicationYear,
    }
  }
}
