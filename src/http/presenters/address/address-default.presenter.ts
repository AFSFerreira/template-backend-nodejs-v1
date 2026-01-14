import type { IPresenterStrategy } from '@custom-types/custom/presenter-strategy'
import type { HTTPAddress } from '@custom-types/http/presenter/address/addres-default'
import type { Address } from '@prisma/client'

export class AddressDefaultPresenter implements IPresenterStrategy<Address, HTTPAddress> {
  toHTTP(input: Address): HTTPAddress {
    const { id, userId, createdAt, ...filteredInfo } = input

    return filteredInfo
  }
}
