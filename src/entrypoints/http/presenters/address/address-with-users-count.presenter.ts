import type { IPresenterStrategy } from '@custom-types/custom/presenter-strategy'
import type {
  AddressWithUsersCountPresenterInput,
  HTTPAddressStates,
} from '@custom-types/http/presenter/address/address-with-users-count'
import { singleton } from 'tsyringe'

@singleton()
export class AddressWithUsersCountPresenter
  implements IPresenterStrategy<AddressWithUsersCountPresenterInput, HTTPAddressStates>
{
  public toHTTP(input: AddressWithUsersCountPresenterInput): HTTPAddressStates {
    return {
      state: input.state,
      usersCount: input.usersCount,
    }
  }

  toHTTPList(inputs: AddressWithUsersCountPresenterInput[]): HTTPAddressStates[] {
    return inputs.map((input) => this.toHTTP(input))
  }
}
