import type { DependencyContainer } from 'tsyringe'
import { AddressDefaultPresenter } from '@http/presenters/address/address-default.presenter'
import { AddressWithUsersCountPresenter } from '@http/presenters/address/address-with-users-count.presenter'
import { registerPresenter } from '@lib/tsyringe/helpers/register-presenter'
import { tsyringeTokens } from '@lib/tsyringe/helpers/tokens'

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
