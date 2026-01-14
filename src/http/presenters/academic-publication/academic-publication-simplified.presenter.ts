import type { IPresenterStrategy } from '@custom-types/custom/presenter-strategy'
import type { HTTPAcademicPublication } from '@custom-types/http/presenter/academic-publication/academic-publication-default'
import type { CustomAcademicPublicationWithSimplifiedDetails } from '@custom-types/repository/prisma/adapter/academic-publication-simplified'

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
