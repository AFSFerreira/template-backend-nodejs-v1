import type {
  AcademicPublicationYearPresenterInput,
  HTTPAcademicPublicationYear,
} from '@custom-types/http/presenter/academic-publication/academic-publication-year'

export const AcademicPublicationYearPresenter = {
  toHTTP(input: AcademicPublicationYearPresenterInput): HTTPAcademicPublicationYear {
    return {
      year: input.year,
      count: input.count,
    }
  },

  toHTTPList(inputs: AcademicPublicationYearPresenterInput[]): HTTPAcademicPublicationYear[] {
    return inputs.map(this.toHTTP)
  },
}
