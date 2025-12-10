import type { IPresenterStrategy } from '@custom-types/custom/presenter-strategy'
import type { HTTPDirectorPosition } from '@custom-types/presenter/director-position/director-position-default'
import type { DirectorPosition } from '@prisma/client'
import { DIRECTOR_POSITION_DEFAULT_PRESENTER_KEY } from '@constants/presenters-constants'
import { RegisterPresenter } from '@presenters/presenter-registry'

@RegisterPresenter(DIRECTOR_POSITION_DEFAULT_PRESENTER_KEY)
export class DirectorPositionDefaultPresenter implements IPresenterStrategy<DirectorPosition, HTTPDirectorPosition> {
  public toHTTP(input: DirectorPosition): HTTPDirectorPosition {
    return {
      publicId: input.publicId,
      position: input.position,
      precedence: input.precedence,
    }
  }
}
