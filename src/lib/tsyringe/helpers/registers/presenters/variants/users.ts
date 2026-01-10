import type { DependencyContainer } from 'tsyringe'
import { registerPresenter } from '@lib/tsyringe/helpers/register-presenter'
import { tokens } from '@lib/tsyringe/helpers/tokens'
import { UserDefaultPresenter } from '@presenters/variants/user/user-default.presenter'
import { UserDetailedPresenter } from '@presenters/variants/user/user-detailed.presenter'
import { UserDetailedPresenterForAdmin } from '@presenters/variants/user/user-detailed-for-admin.presenter'
import { UserSimplifiedPresenter } from '@presenters/variants/user/user-simplified.presenter'

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
