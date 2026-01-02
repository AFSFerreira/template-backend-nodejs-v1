import type { AuthenticateUseCaseRequest, AuthenticateUseCaseResponse } from '@custom-types/use-cases/user/authenticate'
import type { DatabaseContext } from '@lib/prisma/helpers/database-context'
import type { AuthenticationAuditsRepository } from '@repositories/authentication-audits-repository'
import type { UsersRepository } from '@repositories/users-repository'
import { logger } from '@lib/logger'
import { tokens } from '@lib/tsyringe/helpers/tokens'
import { AUTHENTICATION_SUCCESSFUL } from '@messages/loggings/user-loggings'
import { MembershipStatusType } from '@prisma/client'
import { buildUserProfileImageUrl } from '@services/builders/urls/build-user-profile-image-url'
import { MembershipStatusInactiveError } from '@use-cases/errors/user/membership-status-inactive-error'
import { MembershipStatusPendingError } from '@use-cases/errors/user/membership-status-pending-error'
import { compare } from 'bcryptjs'
import { inject, injectable } from 'tsyringe'
import { InvalidCredentialsError } from '../errors/user/invalid-credentials-error'

const DUMMY_HASH = 'CR7&YqVb9zXfK2n4uP3tLsWhJcEg1ABvZdTQMiN0oGpUeCyxLr5HaDmZjSXFkwEt'

@injectable()
export class AuthenticateUseCase {
  constructor(
    @inject(tokens.repositories.users)
    private readonly usersRepository: UsersRepository,

    @inject(tokens.repositories.authenticationAudits)
    private readonly AuthenticationAuditsRepository: AuthenticationAuditsRepository,

    @inject(tokens.infra.database)
    private readonly dbContext: DatabaseContext,
  ) {}

  async execute({
    login,
    password,
    ipAddress,
    remotePort,
    browser,
  }: AuthenticateUseCaseRequest): Promise<AuthenticateUseCaseResponse> {
    const authenticatedUser = await this.dbContext.runInTransaction(async () => {
      const user = await this.usersRepository.findConflictingUser({
        email: login,
        username: login,
      })

      // Comparação obrigatória para evitar timing attacks:
      const hashToCompare = user?.passwordHash ?? DUMMY_HASH
      const doesPasswordMatch = await compare(password, hashToCompare)

      const auditAuthenticateObject = {
        browser: browser ?? null,
        ipAddress: ipAddress ?? null,
        remotePort: remotePort ?? null,
        userId: user?.id ?? null,
      }

      if (!user) {
        await this.AuthenticationAuditsRepository.create({
          ...auditAuthenticateObject,
          status: 'USER_NOT_EXISTS',
        })

        throw new InvalidCredentialsError()
      }

      if (user.membershipStatus === MembershipStatusType.PENDING) {
        throw new MembershipStatusPendingError()
      }

      if (user.membershipStatus === MembershipStatusType.INACTIVE) {
        throw new MembershipStatusInactiveError()
      }

      await this.usersRepository.incrementLoginAttempts(user.id)

      if (!doesPasswordMatch) {
        await this.AuthenticationAuditsRepository.create({
          ...auditAuthenticateObject,
          status: 'INCORRECT_PASSWORD',
        })

        throw new InvalidCredentialsError()
      }

      await this.usersRepository.setLastLogin(user.id)

      await this.AuthenticationAuditsRepository.create({
        ...auditAuthenticateObject,
        status: 'SUCCESS',
        userId: user.id,
      })

      return user
    })

    logger.info(AUTHENTICATION_SUCCESSFUL)

    return {
      user: {
        ...authenticatedUser,
        profileImage: buildUserProfileImageUrl(authenticatedUser.profileImage),
      },
    }
  }
}
