import type { IPresenterStrategy } from '@custom-types/custom/presenter-strategy'
import type { AddressDefaultPresenterInput, HTTPAddress } from '@custom-types/http/presenter/address/address-default'
import { singleton } from 'tsyringe'

@singleton()
export class AddressDefaultPresenter implements IPresenterStrategy<AddressDefaultPresenterInput, HTTPAddress> {
  public toHTTP(input: AddressDefaultPresenterInput): HTTPAddress
  public toHTTP(input: AddressDefaultPresenterInput[]): HTTPAddress[]
  public toHTTP(input: AddressDefaultPresenterInput | AddressDefaultPresenterInput[]): HTTPAddress | HTTPAddress[] {
    if (Array.isArray(input)) {
      return input.map((element) => this.toHTTP(element))
    }
    return {
      zip: input.zip,
      number: input.number,
      complement: input.complement,
      street: input.street,
      district: input.district,
      city: input.city,
    }
  }
}
