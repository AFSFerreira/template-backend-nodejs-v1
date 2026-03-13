import type { IPresenterStrategy } from '@custom-types/custom/presenter-strategy'
import type {
  HTTPSimplifiedUserDetails,
  UserSimplifiedPresenterInput,
} from '@custom-types/http/presenter/user/user-simplified'
import { UserUrlBuilderService } from '@services/builders/urls/build-user-profile-image-url'
import { inject, singleton } from 'tsyringe'

@singleton()
export class UserSimplifiedPresenter
  implements IPresenterStrategy<UserSimplifiedPresenterInput, HTTPSimplifiedUserDetails>
{
  constructor(
    @inject(UserUrlBuilderService)
    private readonly userUrlBuilderService: UserUrlBuilderService,
  ) {}

  public toHTTP(input: UserSimplifiedPresenterInput): HTTPSimplifiedUserDetails
  public toHTTP(input: UserSimplifiedPresenterInput[]): HTTPSimplifiedUserDetails[]
  public toHTTP(
    input: UserSimplifiedPresenterInput | UserSimplifiedPresenterInput[],
  ): HTTPSimplifiedUserDetails | HTTPSimplifiedUserDetails[] {
    if (Array.isArray(input)) {
      return input.map((element) => this.toHTTP(element))
    }
    return {
      id: input.publicId,
      fullName: input.fullName,
      profileImage: this.userUrlBuilderService.buildProfileImageUrl(input.profileImage),
      institutionName: input.institutionName,
      state: input.state,
      email: input.emailIsPublic ? input.email : null,
    }
  }
}
