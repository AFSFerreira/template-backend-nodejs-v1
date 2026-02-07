import type { IPresenterStrategy } from '@custom-types/custom/presenter-strategy'
import type {
  AcademicPublicationDefaultPresenterInput,
  HTTPAcademicPublication,
} from '@custom-types/http/presenter/academic-publication/academic-publication-default'

export class AcademicPublicationDefaultPresenter
  implements IPresenterStrategy<AcademicPublicationDefaultPresenterInput, HTTPAcademicPublication>
{
  toHTTP(input: AcademicPublicationDefaultPresenterInput): HTTPAcademicPublication {
    return {
      title: input.title,
      authorsNames: input.AcademicPublicationAuthors?.map((author) => author.name),
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
