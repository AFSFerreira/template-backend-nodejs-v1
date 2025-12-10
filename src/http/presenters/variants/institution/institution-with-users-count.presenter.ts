import type { IPresenterStrategy } from '@custom-types/custom/presenter-strategy'
import type { HTTPInstitutionWithUsersCount } from '@custom-types/presenter/institution/institution-with-users-count'
import type { InstitutionsUsersCount } from '@custom-types/repository/institution/institutions-users-count'
import { INSTITUTION_WITH_USERS_COUNT_PRESENTER_KEY } from '@constants/presenters-constants'
import { RegisterPresenter } from '@presenters/presenter-registry'

@RegisterPresenter(INSTITUTION_WITH_USERS_COUNT_PRESENTER_KEY)
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
