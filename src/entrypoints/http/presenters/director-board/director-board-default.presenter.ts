import type { IPresenterStrategy } from '@custom-types/custom/presenter-strategy'
import type {
  DirectorBoardDefaultPresenterInput,
  HTTPDirectorBoard,
} from '@custom-types/http/presenter/director-board/director-board-default'
import { DirectorBoardUrlBuilderService } from '@services/builders/urls/build-director-board-profile-image-url'
import { UserUrlBuilderService } from '@services/builders/urls/build-user-profile-image-url'
import { inject, singleton } from 'tsyringe'

@singleton()
export class DirectorBoardDefaultPresenter
  implements IPresenterStrategy<DirectorBoardDefaultPresenterInput, HTTPDirectorBoard>
{
  constructor(
    @inject(DirectorBoardUrlBuilderService)
    private readonly directorBoardUrlBuilderService: DirectorBoardUrlBuilderService,

    @inject(UserUrlBuilderService)
    private readonly userUrlBuilderService: UserUrlBuilderService,
  ) {}

  public toHTTP(input: DirectorBoardDefaultPresenterInput): HTTPDirectorBoard {
    return {
      id: input.publicId,
      profileImage: input.profileImage
        ? this.directorBoardUrlBuilderService.buildProfileImageUrl(input.profileImage)
        : this.userUrlBuilderService.buildProfileImageUrl(input.User.profileImage),
      position: input.DirectorPosition.position,
      publicName: input.publicName,
      linkLattes: input.User.ResearcherProfile?.linkLattes ?? null,
    }
  }

  toHTTPList(inputs: DirectorBoardDefaultPresenterInput[]): HTTPDirectorBoard[] {
    return inputs.map((input) => this.toHTTP(input))
  }
}
