import type { IPresenterStrategy } from '@custom-types/custom/presenter-strategy'
import type {
  AcademicPublicationYearPresenterInput,
  HTTPAcademicPublicationYear,
} from '@custom-types/http/presenter/academic-publication/academic-publication-year'

export class AcademicPublicationYearPresenter
  implements IPresenterStrategy<AcademicPublicationYearPresenterInput, HTTPAcademicPublicationYear>
{
  toHTTP(input: AcademicPublicationYearPresenterInput): HTTPAcademicPublicationYear {
    return {
      year: input.year,
      count: input.count,
    }
  }
}
