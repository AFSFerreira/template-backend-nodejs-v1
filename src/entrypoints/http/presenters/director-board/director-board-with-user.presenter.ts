import type { IPresenterStrategy } from '@custom-types/custom/presenter-strategy'
import type {
  DirectorBoardWithUserPresenterInput,
  HTTPDirectorBoardWithUser,
} from '@custom-types/http/presenter/director-board/director-board-with-user'
import { buildDirectorBoardProfileImageUrl } from '@services/builders/urls/build-director-board-profile-image-url'
import { buildUserProfileImageUrl } from '@services/builders/urls/build-user-profile-image-url'

export class DirectorBoardWithUserPresenter
  implements IPresenterStrategy<DirectorBoardWithUserPresenterInput, HTTPDirectorBoardWithUser>
{
  public toHTTP(input: DirectorBoardWithUserPresenterInput): HTTPDirectorBoardWithUser {
    return {
      id: input.User.publicId,
      publicName: input.publicName,
      profileImage: input.profileImage
        ? buildDirectorBoardProfileImageUrl(input.profileImage)
        : buildUserProfileImageUrl(input.User.profileImage),
      position: input.DirectorPosition.position,
      linkLattes: input.User.linkLattes,
    }
  }
}
