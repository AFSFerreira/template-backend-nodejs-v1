import type { IPresenterStrategy } from '@custom-types/custom/presenter-strategy'
import type {
  DirectorBoardWithUserPresenterInput,
  HTTPDirectorBoardWithUser,
} from '@custom-types/http/presenter/director-board/director-board-with-user'
import { DirectorBoardUrlBuilderService } from '@services/builders/urls/build-director-board-profile-image-url'
import { UserUrlBuilderService } from '@services/builders/urls/build-user-profile-image-url'
import { inject, singleton } from 'tsyringe'

@singleton()
export class DirectorBoardWithUserPresenter
  implements IPresenterStrategy<DirectorBoardWithUserPresenterInput, HTTPDirectorBoardWithUser>
{
  constructor(
    @inject(DirectorBoardUrlBuilderService)
    private readonly directorBoardUrlBuilderService: DirectorBoardUrlBuilderService,

    @inject(UserUrlBuilderService)
    private readonly userUrlBuilderService: UserUrlBuilderService,
  ) {}

  public toHTTP(input: DirectorBoardWithUserPresenterInput): HTTPDirectorBoardWithUser {
    return {
      id: input.User.publicId,
      publicName: input.publicName,
      profileImage: input.profileImage
        ? this.directorBoardUrlBuilderService.buildProfileImageUrl(input.profileImage)
        : this.userUrlBuilderService.buildProfileImageUrl(input.User.profileImage),
      position: input.DirectorPosition.position,
      linkLattes: input.User.ResearcherProfile?.linkLattes ?? null,
    }
  }

  toHTTPList(inputs: DirectorBoardWithUserPresenterInput[]): HTTPDirectorBoardWithUser[] {
    return inputs.map((input) => this.toHTTP(input))
  }
}
