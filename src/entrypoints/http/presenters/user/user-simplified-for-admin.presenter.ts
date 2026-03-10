import type {
  HTTPSimplifiedUserDetailsForAdmin,
  UserSimplifiedForAdminPresenterInput,
} from '@custom-types/http/presenter/user/user-simplified-for-admin'
import { buildUserProfileImageUrl } from '@services/builders/urls/build-user-profile-image-url'

export const UserSimplifiedPresenterForAdmin = {
  toHTTP(input: UserSimplifiedForAdminPresenterInput): HTTPSimplifiedUserDetailsForAdmin {
    return {
      id: input.publicId,
      fullName: input.fullName,
      profileImage: buildUserProfileImageUrl(input.profileImage),
      institutionName: input.institutionName,
      membershipStatus: input.membershipStatus,
      state: input.state,
      email: input.email,
      role: input.role,
    }
  },

  toHTTPList(inputs: UserSimplifiedForAdminPresenterInput[]): HTTPSimplifiedUserDetailsForAdmin[] {
    return inputs.map(this.toHTTP)
  },
}
