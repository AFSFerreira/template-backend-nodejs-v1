import type { IPresenterStrategy } from '@custom-types/custom/presenter-strategy'
import type { HTTPInstitutionWithUsersCount } from '@custom-types/presenter/institution/institution-with-users-count'
import type { InstitutionsUsersCount } from '@custom-types/repository/institution/institutions-users-count'
import { tokens } from '@lib/tsyringe/helpers/tokens'
import { RegisterPresenter } from '@presenters/presenter-registry'

@RegisterPresenter(tokens.presenters.institutionWithUsersCount)
export class InstitutionWithUsersCountPresenter
  implements IPresenterStrategy<InstitutionsUsersCount, HTTPInstitutionWithUsersCount>
{
  public toHTTP(input: InstitutionsUsersCount): HTTPInstitutionWithUsersCount {
    return {
      name: input.name,
      usersCount: input.usersCount,
    }
  }
}
