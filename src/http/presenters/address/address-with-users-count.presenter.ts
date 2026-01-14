import type { IPresenterStrategy } from '@custom-types/custom/presenter-strategy'
import type { HTTPAddressStates } from '@custom-types/http/presenter/address/address-with-user-count'
import type { AddressStates } from '@custom-types/repository/prisma/address-state/address-states'

export class AddressWithUsersCountPresenter implements IPresenterStrategy<AddressStates, HTTPAddressStates> {
  toHTTP(input: AddressStates): HTTPAddressStates {
    return {
      state: input.state,
      usersCount: input.usersCount,
    }
  }
}
