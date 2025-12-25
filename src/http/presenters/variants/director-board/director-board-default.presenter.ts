import type { IPresenterStrategy } from '@custom-types/custom/presenter-strategy'
import type { HTTPDirectorBoard } from '@custom-types/presenter/director-board/director-board-default'
import type { DirectorBoard } from '@prisma/client'
import { DIRECTOR_BOARD_DEFAULT_PRESENTER_KEY } from '@constants/presenters-constants'
import { STATIC_DIRECTOR_BOARD_PROFILE_IMAGES_ROUTE } from '@constants/static-routes-constants'
import { getBackendBaseUrl } from '@lib/logger/helpers/get-backend-base-url'
import { RegisterPresenter } from '@presenters/presenter-registry'
import urlJoin from 'url-join'

@RegisterPresenter(DIRECTOR_BOARD_DEFAULT_PRESENTER_KEY)
export class DirectorBoardDefaultPresenter implements IPresenterStrategy<DirectorBoard, HTTPDirectorBoard> {
  public toHTTP(input: DirectorBoard): HTTPDirectorBoard {
    const backendBaseUrl = getBackendBaseUrl()

    return {
      directorBoardProfileImage: urlJoin(
        backendBaseUrl,
        STATIC_DIRECTOR_BOARD_PROFILE_IMAGES_ROUTE,
        input.directorBoardProfileImage,
      ),
      aboutMe: input.aboutMe,
    }
  }
}
