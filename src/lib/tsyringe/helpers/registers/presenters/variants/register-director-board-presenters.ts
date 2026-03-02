import type { DependencyContainer } from 'tsyringe'
import { DirectorBoardDefaultPresenter } from '@http/presenters/director-board/director-board-default.presenter'
import { DirectorBoardWithUserPresenter } from '@http/presenters/director-board/director-board-with-user.presenter'
import { DirectorBoardWithUserForAdminPresenter } from '@http/presenters/director-board/director-board-with-user-for-admin.presenter'
import { registerPresenter } from '@lib/tsyringe/helpers/register-presenter'
import { tsyringeTokens } from '@lib/tsyringe/helpers/tokens'

export function registerDirectorBoardPresenters(container: DependencyContainer) {
  registerPresenter({
    contextKey: tsyringeTokens.presenters.directorBoard.directorBoardDefault,
    container,
    target: DirectorBoardDefaultPresenter,
  })

  registerPresenter({
    contextKey: tsyringeTokens.presenters.directorBoard.directorBoardWithUser,
    container,
    target: DirectorBoardWithUserPresenter,
  })

  registerPresenter({
    contextKey: tsyringeTokens.presenters.directorBoard.directorBoardWithUserForAdmin,
    container,
    target: DirectorBoardWithUserForAdminPresenter,
  })
}
