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
  public toHTTP(input: AddressWithUsersCountPresenterInput): HTTPAddressStates
  public toHTTP(input: AddressWithUsersCountPresenterInput[]): HTTPAddressStates[]
  public toHTTP(
    input: AddressWithUsersCountPresenterInput | AddressWithUsersCountPresenterInput[],
  ): HTTPAddressStates | HTTPAddressStates[] {
    if (Array.isArray(input)) {
      return input.map((element) => this.toHTTP(element))
    }
    return {
      state: input.state,
      usersCount: input.usersCount,
    }
  }
}
