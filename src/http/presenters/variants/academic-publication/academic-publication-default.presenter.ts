import type { IPresenterStrategy } from '@custom-types/custom/presenter-strategy'
import type { HTTPAcademicPublication } from '@custom-types/presenter/academic-publication/academic-publication-default'
import type { AcademicPublicationWithDetails } from '@custom-types/validator/academic-publication-with-details'
import type { AcademicPublication } from '@prisma/client'
import { ACADEMIC_PUBLICATION_DEFAULT_PRESENTER_KEY } from '@constants/presenters-constants'
import { RegisterPresenter } from '@presenters/presenter-registry'

@RegisterPresenter(ACADEMIC_PUBLICATION_DEFAULT_PRESENTER_KEY)
export class AcademicPublicationDefaultPresenter
  implements IPresenterStrategy<AcademicPublication, HTTPAcademicPublication>
{
  toHTTP(input: AcademicPublicationWithDetails): HTTPAcademicPublication {
    return {
      title: input.title,
      authorsName: input.AcademicPublicationAuthors?.map((author) => author.name),
      editionNumber: input.editionNumber,
      journalName: input.journalName,
      linkDoi: input.linkDoi,
      startPage: input.startPage,
      volume: input.volume,
      mainCategory: input.ActivityArea?.area,
      publicationYear: input.publicationYear,
    }
  }
}
