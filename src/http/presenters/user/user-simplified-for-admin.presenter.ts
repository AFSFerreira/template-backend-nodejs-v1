import type { IPresenterStrategy } from '@custom-types/custom/presenter-strategy'
import type {
  HTTPSimplifiedUserDetailsForAdmin,
  UserSimplifiedForAdminPresenterInput,
} from '@custom-types/http/presenter/user/user-simplified-for-admin'

export class UserSimplifiedPresenterForAdmin
  implements IPresenterStrategy<UserSimplifiedForAdminPresenterInput, HTTPSimplifiedUserDetailsForAdmin>
{
  public toHTTP(input: UserSimplifiedForAdminPresenterInput): HTTPSimplifiedUserDetailsForAdmin {
    return {
      id: input.publicId,
      fullName: input.fullName,
      profileImage: input.profileImage,
      institutionName: input.institutionName,
      state: input.state,
      email: input.email,
      role: input.role,
    }
  }
}
