import type {
  DirectorBoardDefaultPresenterInput,
  HTTPDirectorBoard,
} from '@custom-types/http/presenter/director-board/director-board-default'
import { buildDirectorBoardProfileImageUrl } from '@services/builders/urls/build-director-board-profile-image-url'
import { buildUserProfileImageUrl } from '@services/builders/urls/build-user-profile-image-url'

export const DirectorBoardDefaultPresenter = {
  toHTTP(input: DirectorBoardDefaultPresenterInput): HTTPDirectorBoard {
    return {
      id: input.publicId,
      profileImage: input.profileImage
        ? buildDirectorBoardProfileImageUrl(input.profileImage)
        : buildUserProfileImageUrl(input.User.profileImage),
      position: input.DirectorPosition.position,
      publicName: input.publicName,
      linkLattes: input.User.linkLattes ?? null,
    }
  },

  toHTTPList(inputs: DirectorBoardDefaultPresenterInput[]): HTTPDirectorBoard[] {
    return inputs.map(this.toHTTP)
  },
}
