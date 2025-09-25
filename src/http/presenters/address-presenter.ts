import type { AddressStates } from '@repositories/address-repository'

interface HTTPAddressStates {
  state: string
  usersCount: number
}

export class AddressPresenter {
  static toHTTP(addressState: AddressStates): HTTPAddressStates
  static toHTTP(addressStates: AddressStates[]): HTTPAddressStates[]
  static toHTTP(input: AddressStates | AddressStates[]): HTTPAddressStates | HTTPAddressStates[] {
    if (Array.isArray(input)) {
      return input.map((addressState) => AddressPresenter.toHTTP(addressState))
    }

    return {
      state: input.state,
      usersCount: input.usersCount,
    }
  }
}
