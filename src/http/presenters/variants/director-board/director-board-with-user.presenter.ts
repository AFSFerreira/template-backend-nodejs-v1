import type { IPresenterStrategy } from '@custom-types/custom/presenter-strategy'
import type { HTTPDirectorBoardWithUser } from '@custom-types/presenter/director-board/director-board-with-user'
import type { DirectorBoardWithUser } from '@custom-types/validator/director-board-with-user'
import { DIRECTOR_BOARD_WITH_USER_PRESENTER_KEY } from '@constants/presenters-constants'
import { RegisterPresenter } from '@presenters/presenter-registry'
import { buildDirectorBoardProfileImageUrl } from '@services/http/url/build-director-board-profile-image-url'

@RegisterPresenter(DIRECTOR_BOARD_WITH_USER_PRESENTER_KEY)
export class DirectorBoardDefaultPresenter
  implements IPresenterStrategy<DirectorBoardWithUser, HTTPDirectorBoardWithUser>
{
  public toHTTP(input: DirectorBoardWithUser): HTTPDirectorBoardWithUser {
    return {
      id: input.User.publicId,
      fullName: input.User.fullName,
      directorBoardProfileImage: buildDirectorBoardProfileImageUrl(input.directorBoardProfileImage),
      position: input.DirectorPosition.position,
      linkLattes: input.User.linkLattes,
      aboutMe: input.aboutMe,
    }
  }
}
