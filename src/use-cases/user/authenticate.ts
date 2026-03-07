import type { AuthenticateUseCaseRequest, AuthenticateUseCaseResponse } from '@custom-types/use-cases/user/authenticate'
import type { UsersRepository } from '@repositories/users-repository'
import {
  createAuthenticationAuditEnqueued,
  incrementLoginAttemptsEnqueued,
  resetLoginAttemptsEnqueued,
  setLastLoginEnqueued,
} from '@jobs/queues/facades/security-queue-facade'
import { logger } from '@lib/pino'
import { tsyringeTokens } from '@lib/tsyringe/helpers/tokens'
import { AUTHENTICATION_SUCCESSFUL } from '@messages/loggings/models/user-loggings'
import { MembershipStatusType } from '@prisma/generated/enums'
import { buildUserProfileImageUrl } from '@services/builders/urls/build-user-profile-image-url'
import { HashService } from '@services/hashes/hash-service'
import { MembershipStatusInactiveError } from '@use-cases/errors/user/membership-status-inactive-error'
import { MembershipStatusPendingError } from '@use-cases/errors/user/membership-status-pending-error'
import { inject, injectable } from 'tsyringe'
import { InvalidCredentialsError } from '../errors/user/invalid-credentials-error'

@injectable()
export class AuthenticateUseCase {
  constructor(
    @inject(tsyringeTokens.repositories.users)
    private readonly usersRepository: UsersRepository,
  ) {}

  async execute({
    login,
    password,
    ipAddress,
    remotePort,
    browser,
  }: AuthenticateUseCaseRequest): Promise<AuthenticateUseCaseResponse> {
    const user = await this.usersRepository.findConflictingUser({
      email: login,
      username: login,
    })

    // Comparação obrigatória para evitar timing attacks:
    const hashToCompare = user?.passwordHash ?? (await HashService.getDummyHash())
    const doesPasswordMatch = await HashService.comparePassword({ password, hashedPassword: hashToCompare })

    const auditAuthenticateObject = {
      browser: browser ?? null,
      ipAddress: ipAddress ?? null,
      remotePort: String(remotePort) ?? null,
      userId: user?.id ?? null,
    }

    if (!user || !doesPasswordMatch) {
      await createAuthenticationAuditEnqueued({
        audit: {
          ...auditAuthenticateObject,
          status: !user ? 'USER_NOT_EXISTS' : 'INCORRECT_PASSWORD',
        },
      })

      if (user) {
        await incrementLoginAttemptsEnqueued({ userId: user.id })
      }

      throw new InvalidCredentialsError()
    }

    if (user.membershipStatus === MembershipStatusType.PENDING) {
      throw new MembershipStatusPendingError()
    }

    if (user.membershipStatus === MembershipStatusType.INACTIVE) {
      throw new MembershipStatusInactiveError()
    }

    await createAuthenticationAuditEnqueued({
      audit: {
        ...auditAuthenticateObject,
        status: 'SUCCESS',
      },
    })
    await setLastLoginEnqueued({ userId: user.id })
    await resetLoginAttemptsEnqueued({ userId: user.id })

    logger.info(AUTHENTICATION_SUCCESSFUL)

    return {
      user: {
        ...user,
        profileImage: buildUserProfileImageUrl(user.profileImage),
      },
    }
  }
}
