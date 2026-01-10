import type { DependencyContainer } from 'tsyringe'
import { registerPresenter } from '@lib/tsyringe/helpers/register-presenter'
import { tokens } from '@lib/tsyringe/helpers/tokens'
import { AddressDefaultPresenter } from '@presenters/variants/address/address-default.presenter'
import { AddressWithUsersCountPresenter } from '@presenters/variants/address/address-with-users-count.presenter'

export function registerAddressPresenters(container: DependencyContainer) {
  registerPresenter({
    contextKey: tokens.presenters.address.addressDefault,
    container,
    target: AddressDefaultPresenter,
  })

  registerPresenter({
    contextKey: tokens.presenters.address.addressWithUsersCount,
    container,
    target: AddressWithUsersCountPresenter,
  })
}
