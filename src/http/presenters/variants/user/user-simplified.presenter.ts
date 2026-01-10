import type { IPresenterStrategy } from '@custom-types/custom/presenter-strategy'
import type { HTTPSimplifiedUserDetails, UserWithSimplifiedDetails } from '@custom-types/presenter/user/user-simplified'

export class UserSimplifiedPresenter
  implements IPresenterStrategy<UserWithSimplifiedDetails, HTTPSimplifiedUserDetails>
{
  public toHTTP(input: UserWithSimplifiedDetails): HTTPSimplifiedUserDetails {
    return {
      id: input.publicId,
      fullName: input.fullName,
      profileImage: input.profileImage,
      institutionName: input.institutionName,
      state: input.state,
      email: input.emailIsPublic ? input.email : null,
    }
  }
}
