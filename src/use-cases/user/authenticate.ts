import type { AuthenticateUseCaseRequest, AuthenticateUseCaseResponse } from '@custom-types/use-cases/user/authenticate'
import type { UsersRepository } from '@repositories/users-repository'
import {
  createAuthenticationAuditEnqueued,
  incrementLoginAttemptsEnqueued,
  resetLoginAttemptsEnqueued,
  setLastLoginEnqueued,
  upgradeUserPasswordHashEnqueued,
} from '@jobs/queues/facades/security-queue-facade'
import { logger } from '@lib/pino'
import { tsyringeTokens } from '@lib/tsyringe/helpers/tokens'
import { AUTHENTICATION_SUCCESSFUL } from '@messages/loggings/models/user-loggings'
import { HashService } from '@services/hashes/hash-service'
import { inject, singleton } from 'tsyringe'
import { InvalidCredentialsError } from '../errors/user/invalid-credentials-error'

@singleton()
export class AuthenticateUseCase {
  constructor(
    @inject(tsyringeTokens.repositories.users)
    private readonly usersRepository: UsersRepository,

    @inject(HashService)
    private readonly hashService: HashService,
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
    const hashToCompare = user?.passwordHash ?? (await this.hashService.getDummyHash())
    const doesPasswordMatch = await this.hashService.comparePassword({ password, hashedPassword: hashToCompare })

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

    const needsPasswordHashUpgrade = this.hashService.needsUpgrade(user.passwordHash)

    if (needsPasswordHashUpgrade) {
      await upgradeUserPasswordHashEnqueued({
        userId: user.id,
        password,
      })
    }

    await Promise.all([
      createAuthenticationAuditEnqueued({
        audit: {
          ...auditAuthenticateObject,
          status: 'SUCCESS',
        },
      }),
      setLastLoginEnqueued({ userId: user.id }),
      resetLoginAttemptsEnqueued({ userId: user.id }),
    ])

    logger.info(AUTHENTICATION_SUCCESSFUL)

    return { user }
  }
}
