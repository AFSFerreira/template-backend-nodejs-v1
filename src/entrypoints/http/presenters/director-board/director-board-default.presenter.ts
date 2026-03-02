import type { IPresenterStrategy } from '@custom-types/custom/presenter-strategy'
import type {
  DirectorBoardDefaultPresenterInput,
  HTTPDirectorBoard,
} from '@custom-types/http/presenter/director-board/director-board-default'

export class DirectorBoardDefaultPresenter
  implements IPresenterStrategy<DirectorBoardDefaultPresenterInput, HTTPDirectorBoard>
{
  public toHTTP(input: DirectorBoardDefaultPresenterInput): HTTPDirectorBoard {
    return {
      id: input.publicId,
      profileImage: input.profileImage,
      position: input.DirectorPosition.position,
      publicName: input.publicName,
    }
  }
}
