import type { IPresenterStrategy } from '@custom-types/custom/presenter-strategy'
import type {
  DirectorBoardWithUserPresenterInput,
  HTTPDirectorBoardWithUser,
} from '@custom-types/http/presenter/director-board/director-board-with-user'

export class DirectorBoardWithUserPresenter
  implements IPresenterStrategy<DirectorBoardWithUserPresenterInput, HTTPDirectorBoardWithUser>
{
  public toHTTP(input: DirectorBoardWithUserPresenterInput): HTTPDirectorBoardWithUser {
    return {
      id: input.User.publicId,
      publicName: input.publicName,
      profileImage: input.profileImage,
      position: input.DirectorPosition.position,
      linkLattes: input.User.linkLattes,
    }
  }
}
