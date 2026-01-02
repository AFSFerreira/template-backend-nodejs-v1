import type { IPresenterStrategy } from '@custom-types/custom/presenter-strategy'
import type { HTTPDirectorPosition } from '@custom-types/presenter/director-position/director-position-default'
import type { DirectorPosition } from '@prisma/client'
import { tokens } from '@lib/tsyringe/helpers/tokens'
import { RegisterPresenter } from '@presenters/presenter-registry'

@RegisterPresenter(tokens.presenters.directorPositionDefault)
export class DirectorPositionDefaultPresenter implements IPresenterStrategy<DirectorPosition, HTTPDirectorPosition> {
  public toHTTP(input: DirectorPosition): HTTPDirectorPosition {
    return {
      id: input.publicId,
      position: input.position,
      description: input.description,
      precedence: input.precedence,
    }
  }
}
