import type { IPresenterStrategy } from '@custom-types/custom/presenter-strategy'
import type {
  DirectorPositionDefaultPresenterInput,
  HTTPDirectorPosition,
} from '@custom-types/http/presenter/director-position/director-position-default'

export class DirectorPositionDefaultPresenter
  implements IPresenterStrategy<DirectorPositionDefaultPresenterInput, HTTPDirectorPosition>
{
  public toHTTP(input: DirectorPositionDefaultPresenterInput): HTTPDirectorPosition {
    return {
      id: input.publicId,
      position: input.position,
      description: input.description,
      precedence: input.precedence,
    }
  }
}
