import type { CustomAcademicPublicationWithSimplifiedDetails } from '@custom-types/adapter/academic-publication-simplified'
import type { IPresenterStrategy } from '@custom-types/custom/presenter-strategy'
import type { HTTPAcademicPublication } from '@custom-types/presenter/academic-publication/academic-publication-default'

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
