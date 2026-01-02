import type { IPresenterStrategy } from '@custom-types/custom/presenter-strategy'
import type {
  DirectorBoardDefaultPresenterInput,
  HTTPDirectorBoard,
} from '@custom-types/presenter/director-board/director-board-default'
import { tokens } from '@lib/tsyringe/helpers/tokens'
import { RegisterPresenter } from '@presenters/presenter-registry'

@RegisterPresenter(tokens.presenters.directorBoardDefault)
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
