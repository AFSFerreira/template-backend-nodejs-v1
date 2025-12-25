import type { IPresenterStrategy } from '@custom-types/custom/presenter-strategy'
import type { HTTPDirectorBoardWithUser } from '@custom-types/presenter/director-board/director-board-with-user'
import type { DirectorBoardWithUser } from '@custom-types/validator/director-board-with-user'
import { DIRECTOR_BOARD_WITH_USER_PRESENTER_KEY } from '@constants/presenters-constants'
import { STATIC_DIRECTOR_BOARD_PROFILE_IMAGES_ROUTE } from '@constants/static-routes-constants'
import { getBackendBaseUrl } from '@lib/logger/helpers/get-backend-base-url'
import { RegisterPresenter } from '@presenters/presenter-registry'
import urlJoin from 'url-join'

@RegisterPresenter(DIRECTOR_BOARD_WITH_USER_PRESENTER_KEY)
export class DirectorBoardDefaultPresenter implements IPresenterStrategy<
  DirectorBoardWithUser,
  HTTPDirectorBoardWithUser
> {
  public toHTTP(input: DirectorBoardWithUser): HTTPDirectorBoardWithUser {
    const backendBaseUrl = getBackendBaseUrl()

    return {
      id: input.User.publicId,
      fullName: input.User.fullName,
      directorBoardProfileImage: urlJoin(
        backendBaseUrl,
        STATIC_DIRECTOR_BOARD_PROFILE_IMAGES_ROUTE,
        input.directorBoardProfileImage,
      ),
      position: input.DirectorPosition.position,
      linkLattes: input.User.linkLattes,
      aboutMe: input.aboutMe,
    }
  }
}
