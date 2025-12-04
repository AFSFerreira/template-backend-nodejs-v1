import crypto from 'node:crypto'
import type {
  ResetPasswordUseCaseRequest,
  ResetPasswordUseCaseResponse,
} from '@custom-types/use-cases/user/reset-password'
import { env } from '@env/index'
import { logger } from '@lib/logger'
import { RESET_PASSWORD_SUCCESSFUL } from '@messages/loggings'
import type { UsersRepository } from '@repositories/users-repository'
import { UserNotFoundError } from '@use-cases/errors/user/user-not-found-error'
import { ensureExists } from '@utils/guards/ensure'
import { hash } from 'bcryptjs'
import { InvalidTokenError } from '../errors/user/invalid-token-error'

export class ResetPasswordUseCase {
  constructor(private readonly usersRepository: UsersRepository) {}

  async execute({ newPassword, token }: ResetPasswordUseCaseRequest): Promise<ResetPasswordUseCaseResponse> {
    const tokenHash = crypto.createHash('sha256').update(token, 'utf-8').digest('hex')

    const passwordHash = await hash(newPassword, env.HASH_SALT_ROUNDS)

    const userFound = ensureExists({
      value: await this.usersRepository.validateUserToken(tokenHash),
      error: new UserNotFoundError(),
    })

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
