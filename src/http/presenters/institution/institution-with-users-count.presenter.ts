import type { IPresenterStrategy } from '@custom-types/custom/presenter-strategy'
import type { HTTPInstitutionWithUsersCount } from '@custom-types/http/presenter/institution/institution-with-users-count'
import type { InstitutionsUsersCount } from '@custom-types/repository/prisma/institution/institutions-users-count'

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
