import type { IPresenterStrategy } from '@custom-types/custom/presenter-strategy'
import type {
  HTTPSimplifiedUserDetailsForAdmin,
  UserWithSimplifiedDetailsForAdmin,
} from '@custom-types/presenter/user/user-simplified-for-admin'

export class UserSimplifiedPresenterForAdmin
  implements IPresenterStrategy<UserWithSimplifiedDetailsForAdmin, HTTPSimplifiedUserDetailsForAdmin>
{
  public toHTTP(input: UserWithSimplifiedDetailsForAdmin): HTTPSimplifiedUserDetailsForAdmin {
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
