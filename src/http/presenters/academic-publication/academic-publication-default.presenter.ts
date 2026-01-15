import type { IPresenterStrategy } from '@custom-types/custom/presenter-strategy'
import type { HTTPAcademicPublication } from '@custom-types/http/presenter/academic-publication/academic-publication-default'
import type { AcademicPublicationWithDetails } from '@custom-types/validators/academic-publication-with-details'
import type { AcademicPublication } from '@prisma/client'

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
