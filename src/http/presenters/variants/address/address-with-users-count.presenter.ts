import type { IPresenterStrategy } from '@custom-types/custom/presenter-strategy'
import type { HTTPAddressStates } from '@custom-types/presenter/address/address-with-user-count'
import type { AddressStates } from '@custom-types/repository/address-state/address-states'
import { tokens } from '@lib/tsyringe/helpers/tokens'
import { RegisterPresenter } from '@presenters/presenter-registry'

@RegisterPresenter(tokens.presenters.addressWithUsersCount)
export class AddressWithUsersCountPresenter implements IPresenterStrategy<AddressStates, HTTPAddressStates> {
  toHTTP(input: AddressStates): HTTPAddressStates {
    return {
      state: input.state,
      usersCount: input.usersCount,
    }
  }
}
