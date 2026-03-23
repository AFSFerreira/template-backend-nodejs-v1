import type { VerifyEmailUseCaseRequest, VerifyEmailUseCaseResponse } from '@custom-types/use-cases/user/verify-email'
import type { UsersRepository } from '@repositories/users-repository'
import { logger } from '@lib/pino'
import { tsyringeTokens } from '@lib/tsyringe/helpers/tokens'
import { EMAIL_VERIFICATION_SUCCESSFUL } from '@messages/loggings/models/user-loggings'
import { HashService } from '@services/hashes/hash-service'
import { ensureExists } from '@utils/validators/ensure'
import { inject, singleton } from 'tsyringe'
import { EmailVerificationNotRequestedError } from '../errors/user/email-verification-not-requested-error'
import { InvalidTokenError } from '../errors/user/invalid-token-error'
import { UserNotFoundError } from '../errors/user/user-not-found-error'

@singleton()
export class VerifyEmailUseCase {
  constructor(
    @inject(tsyringeTokens.repositories.users)
    private readonly usersRepository: UsersRepository,

    @inject(HashService)
    private readonly hashService: HashService,
  ) {}

  async execute({ token }: VerifyEmailUseCaseRequest): Promise<VerifyEmailUseCaseResponse> {
    const emailVerificationTokenHash = this.hashService.hashToken(token)

    const userFound = ensureExists({
      value: await this.usersRepository.validateEmailVerificationToken(emailVerificationTokenHash),
      error: new UserNotFoundError(),
    })

    if (!userFound.emailVerificationTokenHash || !userFound.emailVerificationTokenExpiresAt) {
      throw new EmailVerificationNotRequestedError()
    }

    if (new Date() > userFound.emailVerificationTokenExpiresAt) {
      throw new InvalidTokenError()
    }

    const user = await this.usersRepository.confirmEmailVerification(userFound.id)

    logger.info({ userId: user.id, email: user.email }, EMAIL_VERIFICATION_SUCCESSFUL)

    return { user }
  }
}
