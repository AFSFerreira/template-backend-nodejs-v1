import type { IPresenterStrategy } from '@custom-types/custom/presenter-strategy'
import type { HTTPUser } from '@custom-types/presenter/user/user-default'
import type { User } from '@prisma/client'
import { USER_DEFAULT_PRESENTER_KEY } from '@constants/presenters-constants'
import { RegisterPresenter } from '@presenters/presenter-registry'
import { truncateDate } from '@utils/formatters/truncate-date'

@RegisterPresenter(USER_DEFAULT_PRESENTER_KEY)
export class UserDefaultPresenter implements IPresenterStrategy<User, HTTPUser> {
  public toHTTP(input: User): HTTPUser {
    const {
      id,
      passwordHash,
      publicId,
      membershipStatus,
      loginAttempts,
      lastLogin,
      recoveryPasswordTokenHash,
      recoveryPasswordTokenExpiresAt,
      activityAreaId,
      ...filteredUser
    } = input

    return {
      ...filteredUser,
      id: input.publicId,
      birthdate: truncateDate(input.birthdate),
    }
  }
}
