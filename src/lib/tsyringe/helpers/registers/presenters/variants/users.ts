import type { DependencyContainer } from 'tsyringe'
import { registerPresenter } from '@lib/tsyringe/helpers/register-presenter'
import { tokens } from '@lib/tsyringe/helpers/tokens'
import { UserDefaultPresenter } from '@presenters/user/user-default.presenter'
import { UserDetailedPresenter } from '@presenters/user/user-detailed.presenter'
import { UserDetailedPresenterForAdmin } from '@presenters/user/user-detailed-for-admin.presenter'
import { UserSimplifiedPresenter } from '@presenters/user/user-simplified.presenter'

export function registerUserPresenters(container: DependencyContainer) {
  registerPresenter({
    contextKey: tokens.presenters.user.userDefault,
    container,
    target: UserDefaultPresenter,
  })

  registerPresenter({
    contextKey: tokens.presenters.user.userDetailed,
    container,
    target: UserDetailedPresenter,
  })

  registerPresenter({
    contextKey: tokens.presenters.user.userDetailedForAdmin,
    container,
    target: UserDetailedPresenterForAdmin,
  })

  registerPresenter({
    contextKey: tokens.presenters.user.userSimplified,
    container,
    target: UserSimplifiedPresenter,
  })
}
