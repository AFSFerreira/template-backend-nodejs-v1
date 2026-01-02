import type { IPresenterStrategy } from '@custom-types/custom/presenter-strategy'
import type {
  DirectorBoardWithUserPresenterInput,
  HTTPDirectorBoardWithUser,
} from '@custom-types/presenter/director-board/director-board-with-user'
import { tokens } from '@lib/tsyringe/helpers/tokens'
import { RegisterPresenter } from '@presenters/presenter-registry'

@RegisterPresenter(tokens.presenters.directorBoardWithUser)
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
