import type { IPresenterStrategy } from '@custom-types/custom/presenter-strategy'
import type {
  DirectorBoardWithUserForAdminPresenterInput,
  HTTPDirectorBoardWithUserForAdmin,
} from '@custom-types/http/presenter/director-board/director-board-with-user-for-admin'
import type { ProseMirrorSchemaType } from '@custom-types/http/schemas/utils/helpers/generic/prose-mirror-schema'
import { buildDirectorBoardProfileImageUrl } from '@services/builders/urls/build-director-board-profile-image-url'
import { buildUserProfileImageUrl } from '@services/builders/urls/build-user-profile-image-url'

export class DirectorBoardWithUserForAdminPresenter
  implements IPresenterStrategy<DirectorBoardWithUserForAdminPresenterInput, HTTPDirectorBoardWithUserForAdmin>
{
  public toHTTP(input: DirectorBoardWithUserForAdminPresenterInput): HTTPDirectorBoardWithUserForAdmin {
    return {
      id: input.User.publicId,
      publicName: input.publicName,
      profileImage: input.profileImage
        ? buildDirectorBoardProfileImageUrl(input.profileImage)
        : buildUserProfileImageUrl(input.User.profileImage),
      position: input.DirectorPosition.position,
      linkLattes: input.User.linkLattes,
      aboutMe: input.aboutMe as ProseMirrorSchemaType,
    }
  }
}
