import { ADDRESS_DEFAULT_PRESENTER_KEY } from '@constants/presenters-constants'
import type { IPresenterStrategy } from '@custom-types/custom/presenter-strategy'
import type { HTTPAddress } from '@custom-types/presenter/user/user-detailed'
import { RegisterPresenter } from '@presenters/presenter-registry'
import type { Address } from '@prisma/client'

@RegisterPresenter(ADDRESS_DEFAULT_PRESENTER_KEY)
export class AddressDefaultPresenter implements IPresenterStrategy<Address, HTTPAddress> {
  toHTTP(input: Address): HTTPAddress {
    const { id, userId, createdAt, ...filteredInfo } = input

    return filteredInfo
  }
}
