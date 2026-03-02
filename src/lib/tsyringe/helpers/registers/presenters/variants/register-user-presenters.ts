import type { DependencyContainer } from 'tsyringe'
import { UserDefaultPresenter } from '@http/presenters/user/user-default.presenter'
import { UserDetailedPresenter } from '@http/presenters/user/user-detailed.presenter'
import { UserDetailedPresenterForAdmin } from '@http/presenters/user/user-detailed-for-admin.presenter'
import { UserSimplifiedPresenter } from '@http/presenters/user/user-simplified.presenter'
import { UserSimplifiedPresenterForAdmin } from '@http/presenters/user/user-simplified-for-admin.presenter'
import { registerPresenter } from '@lib/tsyringe/helpers/register-presenter'
import { tsyringeTokens } from '@lib/tsyringe/helpers/tokens'

export function registerUserPresenters(container: DependencyContainer) {
  registerPresenter({
    contextKey: tsyringeTokens.presenters.user.userDefault,
    container,
    target: UserDefaultPresenter,
  })

  registerPresenter({
    contextKey: tsyringeTokens.presenters.user.userDetailed,
    container,
    target: UserDetailedPresenter,
  })

  registerPresenter({
    contextKey: tsyringeTokens.presenters.user.userDetailedForAdmin,
    container,
    target: UserDetailedPresenterForAdmin,
  })

  registerPresenter({
    contextKey: tsyringeTokens.presenters.user.userSimplified,
    container,
    target: UserSimplifiedPresenter,
  })

  registerPresenter({
    contextKey: tsyringeTokens.presenters.user.userSimplifiedForAdmin,
    container,
    target: UserSimplifiedPresenterForAdmin,
  })
}
