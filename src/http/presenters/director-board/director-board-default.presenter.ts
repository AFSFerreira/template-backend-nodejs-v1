import { DIRECTOR_BOARD_DEFAULT_PRESENTER_KEY } from '@constants/presenters-constants'
import type { IPresenterStrategy } from '@custom-types/custom/presenter-strategy'
import type { HTTPDirectorBoard } from '@custom-types/presenter/director-board/director-board-default'
import { RegisterPresenter } from '@presenters/presenter-registry'
import type { DirectorBoard } from '@prisma/client'

@RegisterPresenter(DIRECTOR_BOARD_DEFAULT_PRESENTER_KEY)
export class DirectorBoardDefaultPresenter implements IPresenterStrategy<DirectorBoard, HTTPDirectorBoard> {
  public toHTTP(input: DirectorBoard): HTTPDirectorBoard {
    return {
      directorBoardProfileImage: input.directorBoardProfileImage,
      aboutMe: input.aboutMe,
    }
  }
}
