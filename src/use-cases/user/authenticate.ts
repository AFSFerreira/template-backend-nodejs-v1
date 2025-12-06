import type { AuthenticateUseCaseRequest, AuthenticateUseCaseResponse } from '@custom-types/use-cases/user/authenticate'
import { logger } from '@lib/logger'
import { tokens } from '@lib/tsyringe/helpers/tokens'
import { AUTHENTICATION_SUCCESSFUL } from '@messages/loggings'
import { MembershipStatusType, type User } from '@prisma/client'
import type { AuthenticationAuditsRepository } from '@repositories/authentication-audits-repository'
import type { UsersRepository } from '@repositories/users-repository'
import { emailSchema } from '@schemas/utils/generic-components/email-schema'
import { usernameSchema } from '@schemas/utils/generic-components/username-schema'
import { MembershipStatusInactiveError } from '@use-cases/errors/user/membership-status-inactive-error'
import { MembershipStatusPendingError } from '@use-cases/errors/user/membership-status-pending-error'
import { getTrueMapping } from '@utils/mappers/get-true-mapping'
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
  ) {}

  async execute({
    login,
    password,
    ipAddress,
    remotePort,
    browser,
  }: AuthenticateUseCaseRequest): Promise<AuthenticateUseCaseResponse> {
    const user = getTrueMapping<User>([
      {
        expression: emailSchema.safeParse(login).success,
        value: await this.usersRepository.findByEmail(login),
      },
      {
        expression: usernameSchema.safeParse(login).success,
        value: await this.usersRepository.findByUsername(login),
      },
    ])

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

    logger.info({ userId: user.id }, AUTHENTICATION_SUCCESSFUL)

    return { user }
  }
}
