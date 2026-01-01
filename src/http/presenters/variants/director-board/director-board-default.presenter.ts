import type { IPresenterStrategy } from '@custom-types/custom/presenter-strategy'
import type { HTTPDirectorBoard } from '@custom-types/presenter/director-board/director-board-default'
import type { DirectorBoard } from '@prisma/client'
import { tokens } from '@lib/tsyringe/helpers/tokens'
import { RegisterPresenter } from '@presenters/presenter-registry'
import { buildDirectorBoardProfileImageUrl } from '@services/builders/urls/build-director-board-profile-image-url'

@RegisterPresenter(tokens.presenters.directorBoardDefault)
export class DirectorBoardDefaultPresenter implements IPresenterStrategy<DirectorBoard, HTTPDirectorBoard> {
  public toHTTP(input: DirectorBoard): HTTPDirectorBoard {
    return {
      directorBoardProfileImage: buildDirectorBoardProfileImageUrl(input.directorBoardProfileImage),
      aboutMe: input.aboutMe,
    }
  }
}
