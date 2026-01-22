import type { IPresenterStrategy } from '@custom-types/custom/presenter-strategy'
import type {
  HTTPInstitutionWithUsersCount,
  InstitutionWithUsersCountPresenterInput,
} from '@custom-types/http/presenter/institution/institution-with-users-count'

export class InstitutionWithUsersCountPresenter
  implements IPresenterStrategy<InstitutionWithUsersCountPresenterInput, HTTPInstitutionWithUsersCount>
{
  public toHTTP(input: InstitutionWithUsersCountPresenterInput): HTTPInstitutionWithUsersCount {
    return {
      name: input.name,
      usersCount: input.usersCount,
    }
  }
}
