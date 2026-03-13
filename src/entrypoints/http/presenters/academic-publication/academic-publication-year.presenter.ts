import type { IPresenterStrategy } from '@custom-types/custom/presenter-strategy'
import type {
  AcademicPublicationYearPresenterInput,
  HTTPAcademicPublicationYear,
} from '@custom-types/http/presenter/academic-publication/academic-publication-year'
import { singleton } from 'tsyringe'

@singleton()
export class AcademicPublicationYearPresenter
  implements IPresenterStrategy<AcademicPublicationYearPresenterInput, HTTPAcademicPublicationYear>
{
  public toHTTP(input: AcademicPublicationYearPresenterInput): HTTPAcademicPublicationYear
  public toHTTP(input: AcademicPublicationYearPresenterInput[]): HTTPAcademicPublicationYear[]
  public toHTTP(
    input: AcademicPublicationYearPresenterInput | AcademicPublicationYearPresenterInput[],
  ): HTTPAcademicPublicationYear | HTTPAcademicPublicationYear[] {
    if (Array.isArray(input)) {
      return input.map((element) => this.toHTTP(element))
    }
    return {
      year: input.year,
      count: input.count,
    }
  }
}
