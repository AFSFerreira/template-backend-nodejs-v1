import type { IPresenterStrategy } from '@custom-types/custom/presenter-strategy'
import type { HTTPDirectorBoardWithUser } from '@custom-types/presenter/director-board/director-board-with-user'
import type { DirectorBoardWithUser } from '@custom-types/validators/director-board-with-user'
import { tokens } from '@lib/tsyringe/helpers/tokens'
import { RegisterPresenter } from '@presenters/presenter-registry'
import { buildDirectorBoardProfileImageUrl } from '@services/builders/urls/build-director-board-profile-image-url'

@RegisterPresenter(tokens.presenters.directorBoardWithUser)
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
