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
  public toHTTP(input: InstitutionWithUsersCountPresenterInput): HTTPInstitutionWithUsersCount {
    return {
      name: input.name,
      usersCount: input.usersCount,
    }
  }

  toHTTPList(inputs: InstitutionWithUsersCountPresenterInput[]): HTTPInstitutionWithUsersCount[] {
    return inputs.map((input) => this.toHTTP(input))
  }
}
