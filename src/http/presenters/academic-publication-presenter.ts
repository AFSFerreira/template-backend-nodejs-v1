import type { CustomAcademicPublicationWithSimplifiedDetails } from '@custom-types/custom-academic-publication-with-simplified-details-type'

interface HTTPAcademicPublication {
  title: string
  journalName: string
  publicationYear: number
  volume: string
  editionNumber: string
  startPage: string
  linkDoi: string
  mainCategory: string
  authorsName: string[]
}

export class AcademicPublicationPresenter {
  static toHTTP(academicPublication: CustomAcademicPublicationWithSimplifiedDetails): HTTPAcademicPublication
  static toHTTP(academicPublications: CustomAcademicPublicationWithSimplifiedDetails[]): HTTPAcademicPublication[]
  static toHTTP(
    input: CustomAcademicPublicationWithSimplifiedDetails | CustomAcademicPublicationWithSimplifiedDetails[],
  ): HTTPAcademicPublication | HTTPAcademicPublication[] {
    if (Array.isArray(input)) {
      return input.map((academicPublication) => AcademicPublicationPresenter.toHTTP(academicPublication))
    }

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
