import type { IPresenterStrategy } from '@custom-types/custom/presenter-strategy'
import type {
  HTTPSimplifiedUserDetails,
  UserSimplifiedPresenterInput,
} from '@custom-types/entrypoints/http/presenter/user/user-simplified'
import { singleton } from 'tsyringe'

@singleton()
export class UserSimplifiedPresenter
  implements IPresenterStrategy<UserSimplifiedPresenterInput, HTTPSimplifiedUserDetails>
{
  public toHTTP(input: UserSimplifiedPresenterInput): HTTPSimplifiedUserDetails
  public toHTTP(input: UserSimplifiedPresenterInput[]): HTTPSimplifiedUserDetails[]
  public toHTTP(
    input: UserSimplifiedPresenterInput | UserSimplifiedPresenterInput[],
  ): HTTPSimplifiedUserDetails | HTTPSimplifiedUserDetails[] {
    if (Array.isArray(input)) {
      return input.map((element) => this.toHTTP(element))
    }
    return {
      id: input.id,
      fullName: input.fullName,
      email: input.email,
    }
  }
}
