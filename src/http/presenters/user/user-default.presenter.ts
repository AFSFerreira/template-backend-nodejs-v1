import type { IPresenterStrategy } from '@custom-types/custom/presenter-strategy'
import type { HTTPUser, UserDefaultPresenterInput } from '@custom-types/http/presenter/user/user-default'
import { truncateDate } from '@utils/formatters/truncate-date'

export class UserDefaultPresenter implements IPresenterStrategy<UserDefaultPresenterInput, HTTPUser> {
  public toHTTP(input: UserDefaultPresenterInput): HTTPUser {
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
      profileImage: input.profileImage,
      birthdate: truncateDate(input.birthdate),
    }
  }
}
