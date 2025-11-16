import { USER_SIMPLIFIED_PRESENTER_KEY } from '@constants/presenters-constants'
import type { CustomUserWithSimplifiedDetails } from '@custom-types/adapter/output/custom-user-with-simplified-details-type'
import type { IPresenterStrategy } from '@custom-types/custom/presenter-strategy'
import type { HTTPSimplifiedUserDetails } from '@custom-types/presenter/user/user-simplified'
import { RegisterPresenter } from '@presenters/presenter-registry'

@RegisterPresenter(USER_SIMPLIFIED_PRESENTER_KEY)
export class UserSimplifiedPresenter
  implements IPresenterStrategy<CustomUserWithSimplifiedDetails, HTTPSimplifiedUserDetails>
{
  public toHTTP(input: CustomUserWithSimplifiedDetails): HTTPSimplifiedUserDetails {
    return {
      id: input.publicId,
      fullName: input.fullName,
      institutionName: input.institutionName,
      state: input.state,
      email: input.emailIsPublic ? input.email : null,
    }
  }
}
