import type {
  ResetPasswordUseCaseRequest,
  ResetPasswordUseCaseResponse,
} from '@custom-types/use-cases/user/reset-password'
import type { DatabaseContext } from '@lib/prisma/helpers/database-context'
import type { UsersRepository } from '@repositories/users-repository'
import { env } from '@env/index'
import { logger } from '@lib/logger'
import { tsyringeTokens } from '@lib/tsyringe/helpers/tokens'
import { RESET_PASSWORD_SUCCESSFUL } from '@messages/loggings/models/user-loggings'
import { PasswordRecoveryNotRequestedByUserError } from '@use-cases/errors/user/password-recovery-not-requested-by-user-error'
import { UserNotFoundError } from '@use-cases/errors/user/user-not-found-error'
import { hashToken } from '@utils/tokens/hash-token'
import { ensureExists } from '@utils/validators/ensure'
import { hash } from 'bcryptjs'
import { inject, injectable } from 'tsyringe'
import { InvalidTokenError } from '../errors/user/invalid-token-error'

@injectable()
export class ResetPasswordUseCase {
  constructor(
    @inject(tsyringeTokens.repositories.users)
    private readonly usersRepository: UsersRepository,

    @inject(tsyringeTokens.infra.database)
    private readonly dbContext: DatabaseContext,
  ) {}

  async execute({ newPassword, token }: ResetPasswordUseCaseRequest): Promise<ResetPasswordUseCaseResponse> {
    const tokenHash = hashToken(token)
    const passwordHash = await hash(newPassword, env.HASH_SALT_ROUNDS)

    const user = await this.dbContext.runInTransaction(async () => {
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

      const updatedUser = await this.usersRepository.changePassword({
        id: userFound.id,
        passwordHash,
      })

      return updatedUser
    })

    logger.info(RESET_PASSWORD_SUCCESSFUL)

    return { user }
  }
}
