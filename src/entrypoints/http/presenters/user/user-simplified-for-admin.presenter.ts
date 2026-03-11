import type { IPresenterStrategy } from '@custom-types/custom/presenter-strategy'
import type {
  HTTPSimplifiedUserDetailsForAdmin,
  UserSimplifiedForAdminPresenterInput,
} from '@custom-types/http/presenter/user/user-simplified-for-admin'
import { UserUrlBuilderService } from '@services/builders/urls/build-user-profile-image-url'
import { inject, singleton } from 'tsyringe'

@singleton()
export class UserSimplifiedPresenterForAdmin
  implements IPresenterStrategy<UserSimplifiedForAdminPresenterInput, HTTPSimplifiedUserDetailsForAdmin>
{
  constructor(
    @inject(UserUrlBuilderService)
    private readonly userUrlBuilderService: UserUrlBuilderService,
  ) {}

  public toHTTP(input: UserSimplifiedForAdminPresenterInput): HTTPSimplifiedUserDetailsForAdmin {
    return {
      id: input.publicId,
      fullName: input.fullName,
      profileImage: this.userUrlBuilderService.buildProfileImageUrl(input.profileImage),
      institutionName: input.institutionName,
      membershipStatus: input.membershipStatus,
      state: input.state,
      email: input.email,
      role: input.role,
    }
  }

  toHTTPList(inputs: UserSimplifiedForAdminPresenterInput[]): HTTPSimplifiedUserDetailsForAdmin[] {
    return inputs.map((input) => this.toHTTP(input))
  }
}
