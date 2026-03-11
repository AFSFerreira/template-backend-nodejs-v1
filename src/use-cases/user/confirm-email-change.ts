import type {
  ConfirmEmailChangeUseCaseRequest,
  ConfirmEmailChangeUseCaseResponse,
} from '@custom-types/use-cases/user/confirm-email-change'
import type { UsersRepository } from '@repositories/users-repository'
import { logger } from '@lib/pino'
import { tsyringeTokens } from '@lib/tsyringe/helpers/tokens'
import { EMAIL_UPDATED_SUCCESSFULLY } from '@messages/loggings/models/user-loggings'
import { HashService } from '@services/hashes/hash-service'
import { EmailChangeNotRequestedError } from '@use-cases/errors/user/email-change-not-requested-error'
import { InvalidTokenError } from '@use-cases/errors/user/invalid-token-error'
import { UserNotFoundError } from '@use-cases/errors/user/user-not-found-error'
import { ensureExists } from '@utils/validators/ensure'
import { inject, singleton } from 'tsyringe'

@singleton()
export class ConfirmEmailChangeUseCase {
  constructor(
    @inject(tsyringeTokens.repositories.users)
    private readonly usersRepository: UsersRepository,

    @inject(HashService)
    private readonly hashService: HashService,
  ) {}

  async execute({ token }: ConfirmEmailChangeUseCaseRequest): Promise<ConfirmEmailChangeUseCaseResponse> {
    const emailVerificationTokenHash = this.hashService.hashToken(token)

    const userFound = ensureExists({
      value: await this.usersRepository.validateEmailVerificationToken(emailVerificationTokenHash),
      error: new UserNotFoundError(),
    })

    if (!userFound.emailVerificationTokenHash || !userFound.emailVerificationTokenExpiresAt || !userFound.newEmail) {
      throw new EmailChangeNotRequestedError()
    }

    if (new Date() > userFound.emailVerificationTokenExpiresAt) {
      throw new InvalidTokenError()
    }

    const user = await this.usersRepository.confirmEmailChange({
      id: userFound.id,
      newEmail: userFound.newEmail,
    })

    logger.info(
      {
        userPublicId: user.publicId,
        newEmail: user.email,
      },
      EMAIL_UPDATED_SUCCESSFULLY,
    )

    return { user }
  }
}
