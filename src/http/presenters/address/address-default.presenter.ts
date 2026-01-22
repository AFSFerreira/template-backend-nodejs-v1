import type { IPresenterStrategy } from '@custom-types/custom/presenter-strategy'
import type { AddressDefaultPresenterInput, HTTPAddress } from '@custom-types/http/presenter/address/address-default'

export class AddressDefaultPresenter implements IPresenterStrategy<AddressDefaultPresenterInput, HTTPAddress> {
  public toHTTP(input: AddressDefaultPresenterInput): HTTPAddress {
    const { id, userId, createdAt, ...filteredInfo } = input

    return filteredInfo
  }
}
