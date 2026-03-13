import type { IPresenterStrategy } from '@custom-types/custom/presenter-strategy'
import type {
  HTTPInstitutionWithUsersCount,
  InstitutionWithUsersCountPresenterInput,
} from '@custom-types/http/presenter/institution/institution-with-users-count'
import { singleton } from 'tsyringe'

@singleton()
export class InstitutionWithUsersCountPresenter
  implements IPresenterStrategy<InstitutionWithUsersCountPresenterInput, HTTPInstitutionWithUsersCount>
{
  public toHTTP(input: InstitutionWithUsersCountPresenterInput): HTTPInstitutionWithUsersCount
  public toHTTP(input: InstitutionWithUsersCountPresenterInput[]): HTTPInstitutionWithUsersCount[]
  public toHTTP(
    input: InstitutionWithUsersCountPresenterInput | InstitutionWithUsersCountPresenterInput[],
  ): HTTPInstitutionWithUsersCount | HTTPInstitutionWithUsersCount[] {
    if (Array.isArray(input)) {
      return input.map((element) => this.toHTTP(element))
    }
    return {
      name: input.name,
      usersCount: input.usersCount,
    }
  }
}
