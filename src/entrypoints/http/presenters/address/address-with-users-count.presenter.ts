import type {
  AddressWithUsersCountPresenterInput,
  HTTPAddressStates,
} from '@custom-types/http/presenter/address/address-with-users-count'

export const AddressWithUsersCountPresenter = {
  toHTTP(input: AddressWithUsersCountPresenterInput): HTTPAddressStates {
    return {
      state: input.state,
      usersCount: input.usersCount,
    }
  },

  toHTTPList(inputs: AddressWithUsersCountPresenterInput[]): HTTPAddressStates[] {
    return inputs.map(this.toHTTP)
  },
}
