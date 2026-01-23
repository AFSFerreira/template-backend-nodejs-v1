import type { DependencyContainer } from 'tsyringe'
import { registerPresenter } from '@lib/tsyringe/helpers/register-presenter'
import { tsyringeTokens } from '@lib/tsyringe/helpers/tokens'
import { UserDefaultPresenter } from '@presenters/user/user-default.presenter'
import { UserDetailedPresenter } from '@presenters/user/user-detailed.presenter'
import { UserDetailedPresenterForAdmin } from '@presenters/user/user-detailed-for-admin.presenter'
import { UserSimplifiedPresenter } from '@presenters/user/user-simplified.presenter'
import { UserSimplifiedPresenterForAdmin } from '@presenters/user/user-simplified-for-admin.presenter'

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
