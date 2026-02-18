import type { AuthenticateUseCaseRequest, AuthenticateUseCaseResponse } from '@custom-types/use-cases/user/authenticate'
import type { DatabaseContext } from '@lib/prisma/helpers/database-context'
import type { AuthenticationAuditsRepository } from '@repositories/authentication-audits-repository'
import type { UsersRepository } from '@repositories/users-repository'
import { logger } from '@lib/logger'
import { tsyringeTokens } from '@lib/tsyringe/helpers/tokens'
import { AUTHENTICATION_SUCCESSFUL } from '@messages/loggings/models/user-loggings'
import { MembershipStatusType } from '@prisma/generated/enums'
import { buildUserProfileImageUrl } from '@services/builders/urls/build-user-profile-image-url'
import { HashService } from '@services/hashes/hash-service'
import { MembershipStatusInactiveError } from '@use-cases/errors/user/membership-status-inactive-error'
import { MembershipStatusPendingError } from '@use-cases/errors/user/membership-status-pending-error'
import { inject, injectable } from 'tsyringe'
import { InvalidCredentialsError } from '../errors/user/invalid-credentials-error'

const DUMMY_HASH = '$2a$10$8.Bq25v1HMyW7ZJv.rG/u.z7jZ0r7Wj/69/x4O/E4QO5l4M/m.v/y'

@injectable()
export class AuthenticateUseCase {
  constructor(
    @inject(tsyringeTokens.repositories.users)
    private readonly usersRepository: UsersRepository,

    @inject(tsyringeTokens.repositories.authenticationAudits)
    private readonly AuthenticationAuditsRepository: AuthenticationAuditsRepository,

    @inject(tsyringeTokens.infra.database)
    private readonly dbContext: DatabaseContext,
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
    const hashToCompare = user?.passwordHash ?? DUMMY_HASH
    const doesPasswordMatch = await HashService.comparePassword({ password, hashedPassword: hashToCompare })

    const auditAuthenticateObject = {
      browser: browser ?? null,
      ipAddress: ipAddress ?? null,
      remotePort: remotePort ?? null,
      userId: user?.id ?? null,
    }

    if (!user || !doesPasswordMatch) {
      await this.AuthenticationAuditsRepository.create({
        ...auditAuthenticateObject,
        status: !user ? 'USER_NOT_EXISTS' : 'INCORRECT_PASSWORD',
      })

      throw new InvalidCredentialsError()
    }

    if (user.membershipStatus === MembershipStatusType.PENDING) {
      throw new MembershipStatusPendingError()
    }

    if (user.membershipStatus === MembershipStatusType.INACTIVE) {
      throw new MembershipStatusInactiveError()
    }

    await this.dbContext.runInTransaction(async () => {
      await Promise.all([
        this.usersRepository.incrementLoginAttempts(user.id),
        this.usersRepository.setLastLogin(user.id),
        this.AuthenticationAuditsRepository.create({
          ...auditAuthenticateObject,
          status: 'SUCCESS',
        }),
      ])
    })

    logger.info(AUTHENTICATION_SUCCESSFUL)

    return {
      user: {
        ...user,
        profileImage: buildUserProfileImageUrl(user.profileImage),
      },
    }
  }
}
