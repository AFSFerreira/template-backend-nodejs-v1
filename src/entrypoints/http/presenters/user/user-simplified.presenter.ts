import type {
  HTTPSimplifiedUserDetails,
  UserSimplifiedPresenterInput,
} from '@custom-types/http/presenter/user/user-simplified'
import { buildUserProfileImageUrl } from '@services/builders/urls/build-user-profile-image-url'

export const UserSimplifiedPresenter = {
  toHTTP(input: UserSimplifiedPresenterInput): HTTPSimplifiedUserDetails {
    return {
      id: input.publicId,
      fullName: input.fullName,
      profileImage: buildUserProfileImageUrl(input.profileImage),
      institutionName: input.institutionName,
      state: input.state,
      email: input.emailIsPublic ? input.email : null,
    }
  },

  toHTTPList(inputs: UserSimplifiedPresenterInput[]): HTTPSimplifiedUserDetails[] {
    return inputs.map(this.toHTTP)
  },
}
