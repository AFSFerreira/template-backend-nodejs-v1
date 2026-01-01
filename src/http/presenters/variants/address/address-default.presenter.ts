import type { IPresenterStrategy } from '@custom-types/custom/presenter-strategy'
import type { HTTPAddress } from '@custom-types/presenter/address/addres-default'
import type { Address } from '@prisma/client'
import { tokens } from '@lib/tsyringe/helpers/tokens'
import { RegisterPresenter } from '@presenters/presenter-registry'

@RegisterPresenter(tokens.presenters.addressDefault)
export class AddressDefaultPresenter implements IPresenterStrategy<Address, HTTPAddress> {
  toHTTP(input: Address): HTTPAddress {
    const { id, userId, createdAt, ...filteredInfo } = input

    return filteredInfo
  }
}
