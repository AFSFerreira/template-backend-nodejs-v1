import type { AddressDefaultPresenterInput, HTTPAddress } from '@custom-types/http/presenter/address/address-default'

export const AddressDefaultPresenter = {
  toHTTP(input: AddressDefaultPresenterInput): HTTPAddress {
    return {
      zip: input.zip,
      number: input.number,
      complement: input.complement,
      street: input.street,
      district: input.district,
      city: input.city,
    }
  },

  toHTTPList(inputs: AddressDefaultPresenterInput[]): HTTPAddress[] {
    return inputs.map(this.toHTTP)
  },
}
