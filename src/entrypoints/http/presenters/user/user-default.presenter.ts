import type { IPresenterStrategy } from '@custom-types/custom/presenter-strategy'
import type { HTTPUser, UserDefaultPresenterInput } from '@custom-types/entrypoints/http/presenter/user/user-default'
import { truncateDate } from '@utils/formatters/truncate-date'
import { singleton } from 'tsyringe'

@singleton()
export class UserDefaultPresenter implements IPresenterStrategy<UserDefaultPresenterInput, HTTPUser> {
  public toHTTP(input: UserDefaultPresenterInput): HTTPUser
  public toHTTP(input: UserDefaultPresenterInput[]): HTTPUser[]
  public toHTTP(input: UserDefaultPresenterInput | UserDefaultPresenterInput[]): HTTPUser | HTTPUser[] {
    if (Array.isArray(input)) {
      return input.map((element) => this.toHTTP(element))
    }

    return {
      id: input.id,
      email: input.email,
      fullName: input.fullName,
      username: input.username,
      birthdate: truncateDate(input.birthdate),
    }
  }
}
