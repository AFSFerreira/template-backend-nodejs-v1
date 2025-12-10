import type { IPresenterStrategy } from '@custom-types/custom/presenter-strategy'
import type { HTTPAddressStates } from '@custom-types/presenter/address/address-with-user-count'
import type { AddressStates } from '@custom-types/repository/address-state/address-states'
import { ADDRESS_WITH_USERS_COUNT_PRESENTER_KEY } from '@constants/presenters-constants'
import { RegisterPresenter } from '@presenters/presenter-registry'

@RegisterPresenter(ADDRESS_WITH_USERS_COUNT_PRESENTER_KEY)
export class AddressWithUsersCountPresenter implements IPresenterStrategy<AddressStates, HTTPAddressStates> {
  toHTTP(input: AddressStates): HTTPAddressStates {
    return {
      state: input.state,
      usersCount: input.usersCount,
    }
  }
}
