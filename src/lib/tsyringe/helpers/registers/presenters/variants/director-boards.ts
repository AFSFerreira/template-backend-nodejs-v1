import type { DependencyContainer } from 'tsyringe'
import { registerPresenter } from '@lib/tsyringe/helpers/register-presenter'
import { tokens } from '@lib/tsyringe/helpers/tokens'
import { DirectorBoardDefaultPresenter } from '@presenters/director-board/director-board-default.presenter'
import { DirectorBoardWithUserPresenter } from '@presenters/director-board/director-board-with-user.presenter'
import { DirectorBoardWithUserForAdminPresenter } from '@presenters/director-board/director-board-with-user-for-admin.presenter'

export function registerDirectorBoardPresenters(container: DependencyContainer) {
  registerPresenter({
    contextKey: tokens.presenters.directorBoard.directorBoardDefault,
    container,
    target: DirectorBoardDefaultPresenter,
  })

  registerPresenter({
    contextKey: tokens.presenters.directorBoard.directorBoardWithUser,
    container,
    target: DirectorBoardWithUserPresenter,
  })

  registerPresenter({
    contextKey: tokens.presenters.directorBoard.directorBoardWithUserForAdmin,
    container,
    target: DirectorBoardWithUserForAdminPresenter,
  })
}
