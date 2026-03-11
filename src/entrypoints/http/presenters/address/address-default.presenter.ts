import type { IPresenterStrategy } from '@custom-types/custom/presenter-strategy'
import type { AddressDefaultPresenterInput, HTTPAddress } from '@custom-types/http/presenter/address/address-default'
import { singleton } from 'tsyringe'

@singleton()
export class AddressDefaultPresenter implements IPresenterStrategy<AddressDefaultPresenterInput, HTTPAddress> {
  public toHTTP(input: AddressDefaultPresenterInput): HTTPAddress {
    return {
      zip: input.zip,
      number: input.number,
      complement: input.complement,
      street: input.street,
      district: input.district,
      city: input.city,
    }
  }

  toHTTPList(inputs: AddressDefaultPresenterInput[]): HTTPAddress[] {
    return inputs.map((input) => this.toHTTP(input))
  }
}
