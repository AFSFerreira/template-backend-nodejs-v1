import type { IPresenterStrategy } from '@custom-types/custom/presenter-strategy'
import type { HTTPAddress } from '@custom-types/presenter/address/addres-default'
import type { Address } from '@prisma/client'
import { ADDRESS_DEFAULT_PRESENTER_KEY } from '@constants/presenters-constants'
import { RegisterPresenter } from '@presenters/presenter-registry'

@RegisterPresenter(ADDRESS_DEFAULT_PRESENTER_KEY)
export class AddressDefaultPresenter implements IPresenterStrategy<Address, HTTPAddress> {
  toHTTP(input: Address): HTTPAddress {
    const { id, userId, createdAt, ...filteredInfo } = input

    return filteredInfo
  }
}
