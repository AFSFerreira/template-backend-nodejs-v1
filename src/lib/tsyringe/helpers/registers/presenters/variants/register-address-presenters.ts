import type { DependencyContainer } from 'tsyringe'
import { registerPresenter } from '@lib/tsyringe/helpers/register-presenter'
import { tsyringeTokens } from '@lib/tsyringe/helpers/tokens'
import { AddressDefaultPresenter } from '@presenters/address/address-default.presenter'
import { AddressWithUsersCountPresenter } from '@presenters/address/address-with-users-count.presenter'

export function registerAddressPresenters(container: DependencyContainer) {
  registerPresenter({
    contextKey: tsyringeTokens.presenters.address.addressDefault,
    container,
    target: AddressDefaultPresenter,
  })

  registerPresenter({
    contextKey: tsyringeTokens.presenters.address.addressWithUsersCount,
    container,
    target: AddressWithUsersCountPresenter,
  })
}
