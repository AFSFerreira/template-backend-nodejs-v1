import type { IPresenterStrategy } from '@custom-types/custom/presenter-strategy'
import type {
  ActivityAreaWithAcademicPublicationsCountPresenterInput,
  HTTPActivityAreaWithAcademicPublicationsCount,
} from '@custom-types/http/presenter/academic-publication/activity-area-with-academic-publications-count'
import { singleton } from 'tsyringe'

@singleton()
export class ActivityAreaWithAcademicPublicationsCountPresenter
  implements
    IPresenterStrategy<
      ActivityAreaWithAcademicPublicationsCountPresenterInput,
      HTTPActivityAreaWithAcademicPublicationsCount
    >
{
  public toHTTP(
    input: ActivityAreaWithAcademicPublicationsCountPresenterInput,
  ): HTTPActivityAreaWithAcademicPublicationsCount
  public toHTTP(
    input: ActivityAreaWithAcademicPublicationsCountPresenterInput[],
  ): HTTPActivityAreaWithAcademicPublicationsCount[]
  public toHTTP(
    input:
      | ActivityAreaWithAcademicPublicationsCountPresenterInput
      | ActivityAreaWithAcademicPublicationsCountPresenterInput[],
  ): HTTPActivityAreaWithAcademicPublicationsCount | HTTPActivityAreaWithAcademicPublicationsCount[] {
    if (Array.isArray(input)) {
      return input.map((element) => this.toHTTP(element))
    }

    return {
      area: input.area,
      publicationsCount: input.publicationsCount,
    }
  }
}
