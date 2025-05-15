import type {
  ResetPasswordUseCaseRequest,
  ResetPasswordUseCaseResponse,
} from '@custom-types/use-cases/user/reset-password'
import type { UsersRepository } from '@repositories/users-repository'
import { logger } from '@lib/pino'
import { tsyringeTokens } from '@lib/tsyringe/helpers/tokens'
import { RESET_PASSWORD_SUCCESSFUL } from '@messages/loggings/models/user-loggings'
import { HashService } from '@services/hashes/hash-service'
import { PasswordRecoveryNotRequestedByUserError } from '@use-cases/errors/user/password-recovery-not-requested-by-user-error'
import { UserNotFoundError } from '@use-cases/errors/user/user-not-found-error'
import { ensureExists } from '@utils/validators/ensure'
import { inject, singleton } from 'tsyringe'
import { InvalidTokenError } from '../errors/user/invalid-token-error'

@singleton()
export class ResetPasswordUseCase {
  constructor(
    @inject(tsyringeTokens.repositories.users)
    private readonly usersRepository: UsersRepository,

    @inject(HashService)
    private readonly hashService: HashService,
  ) {}

  async execute({ newPassword, token }: ResetPasswordUseCaseRequest): Promise<ResetPasswordUseCaseResponse> {
    const tokenHash = this.hashService.hashToken(token)
    const passwordHash = await this.hashService.hashPassword(newPassword)

    const userFound = ensureExists({
      value: await this.usersRepository.validateUserToken(tokenHash),
      error: new UserNotFoundError(),
    })

    if (!userFound.recoveryPasswordTokenExpiresAt) {
      throw new PasswordRecoveryNotRequestedByUserError()
    }

    if (userFound.recoveryPasswordTokenExpiresAt < new Date()) {
      throw new InvalidTokenError()
    }

    const user = await this.usersRepository.changePassword({
      id: userFound.id,
      passwordHash,
    })

    logger.info(RESET_PASSWORD_SUCCESSFUL)

    return { user }
  }
}
