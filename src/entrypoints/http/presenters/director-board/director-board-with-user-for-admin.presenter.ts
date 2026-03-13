import type { IPresenterStrategy } from '@custom-types/custom/presenter-strategy'
import type {
  DirectorBoardWithUserForAdminPresenterInput,
  HTTPDirectorBoardWithUserForAdmin,
} from '@custom-types/http/presenter/director-board/director-board-with-user-for-admin'
import type { ProseMirrorSchemaType } from '@custom-types/http/schemas/utils/helpers/generic/prose-mirror-schema'
import { DirectorBoardUrlBuilderService } from '@services/builders/urls/build-director-board-profile-image-url'
import { UserUrlBuilderService } from '@services/builders/urls/build-user-profile-image-url'
import { inject, singleton } from 'tsyringe'

@singleton()
export class DirectorBoardWithUserForAdminPresenter
  implements IPresenterStrategy<DirectorBoardWithUserForAdminPresenterInput, HTTPDirectorBoardWithUserForAdmin>
{
  constructor(
    @inject(DirectorBoardUrlBuilderService)
    private readonly directorBoardUrlBuilderService: DirectorBoardUrlBuilderService,

    @inject(UserUrlBuilderService)
    private readonly userUrlBuilderService: UserUrlBuilderService,
  ) {}

  public toHTTP(input: DirectorBoardWithUserForAdminPresenterInput): HTTPDirectorBoardWithUserForAdmin
  public toHTTP(input: DirectorBoardWithUserForAdminPresenterInput[]): HTTPDirectorBoardWithUserForAdmin[]
  public toHTTP(
    input: DirectorBoardWithUserForAdminPresenterInput | DirectorBoardWithUserForAdminPresenterInput[],
  ): HTTPDirectorBoardWithUserForAdmin | HTTPDirectorBoardWithUserForAdmin[] {
    if (Array.isArray(input)) {
      return input.map((element) => this.toHTTP(element))
    }
    return {
      id: input.User.publicId,
      publicName: input.publicName,
      profileImage: input.profileImage
        ? this.directorBoardUrlBuilderService.buildProfileImageUrl(input.profileImage)
        : this.userUrlBuilderService.buildProfileImageUrl(input.User.profileImage),
      position: input.DirectorPosition.position,
      linkLattes: input.User.ResearcherProfile?.linkLattes ?? null,
      aboutMe: input.aboutMe as ProseMirrorSchemaType,
    }
  }
}
