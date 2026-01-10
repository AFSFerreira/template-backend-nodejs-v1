import type { IPresenterStrategy } from '@custom-types/custom/presenter-strategy'
import type { HTTPUser } from '@custom-types/presenter/user/user-default'
import type { User } from '@prisma/client'
import { truncateDate } from '@utils/formatters/truncate-date'

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
      profileImage: input.profileImage,
      birthdate: truncateDate(input.birthdate),
    }
  }
}
