import type { IPresenterStrategy } from '@custom-types/custom/presenter-strategy'
import type { HTTPUser } from '@custom-types/presenter/user/user-default'
import type { User } from '@prisma/client'
import { USER_DEFAULT_PRESENTER_KEY } from '@constants/presenters-constants'
import { STATIC_USER_PROFILE_IMAGE_ROUTE } from '@constants/static-routes-constants'
import { getBackendBaseUrl } from '@lib/logger/helpers/get-backend-base-url'
import { RegisterPresenter } from '@presenters/presenter-registry'
import { truncateDate } from '@utils/formatters/truncate-date'
import urlJoin from 'url-join'

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

    const backendBaseUrl = getBackendBaseUrl()

    return {
      ...filteredUser,
      id: input.publicId,
      profileImage: urlJoin(backendBaseUrl, STATIC_USER_PROFILE_IMAGE_ROUTE, input.profileImage),
      birthdate: truncateDate(input.birthdate),
    }
  }
}
