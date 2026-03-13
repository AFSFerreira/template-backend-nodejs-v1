import type { IPresenterStrategy } from '@custom-types/custom/presenter-strategy'
import type {
  DirectorPositionDefaultPresenterInput,
  HTTPDirectorPosition,
} from '@custom-types/http/presenter/director-position/director-position-default'
import { singleton } from 'tsyringe'

@singleton()
export class DirectorPositionDefaultPresenter
  implements IPresenterStrategy<DirectorPositionDefaultPresenterInput, HTTPDirectorPosition>
{
  public toHTTP(input: DirectorPositionDefaultPresenterInput): HTTPDirectorPosition
  public toHTTP(input: DirectorPositionDefaultPresenterInput[]): HTTPDirectorPosition[]
  public toHTTP(
    input: DirectorPositionDefaultPresenterInput | DirectorPositionDefaultPresenterInput[],
  ): HTTPDirectorPosition | HTTPDirectorPosition[] {
    if (Array.isArray(input)) {
      return input.map((element) => this.toHTTP(element))
    }
    return {
      id: input.publicId,
      position: input.position,
      description: input.description,
      precedence: input.precedence,
    }
  }
}
