import type { IPresenterStrategy } from '@custom-types/custom/presenter-strategy'
import type {
  HTTPSimplifiedUserDetails,
  UserSimplifiedPresenterInput,
} from '@custom-types/http/presenter/user/user-simplified'

export class UserSimplifiedPresenter
  implements IPresenterStrategy<UserSimplifiedPresenterInput, HTTPSimplifiedUserDetails>
{
  public toHTTP(input: UserSimplifiedPresenterInput): HTTPSimplifiedUserDetails {
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
