import type { HTTPAcademicPublication } from '@custom-types/http/presenter/academic-publication/academic-publication-default'
import type { AcademicPublicationSimplifiedPresenterInput } from '@custom-types/http/presenter/academic-publication/academic-publication-simplified'

export const AcademicPublicationFilteredPresenter = {
  toHTTP(input: AcademicPublicationSimplifiedPresenterInput): HTTPAcademicPublication {
    return {
      title: input.title,
      authorsNames: input.authorsNames,
      editionNumber: input.editionNumber,
      journalName: input.journalName,
      linkDoi: input.linkDoi,
      startPage: input.startPage,
      volume: input.volume,
      mainCategory: input.mainCategory,
      publicationYear: input.publicationYear,
    }
  },

  toHTTPList(inputs: AcademicPublicationSimplifiedPresenterInput[]): HTTPAcademicPublication[] {
    return inputs.map(this.toHTTP)
  },
}
