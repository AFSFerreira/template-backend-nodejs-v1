import crypto from 'node:crypto'
import type { UserWithDetails } from '@custom-types/user-with-details'
import { env } from '@env/index'
import type { UsersRepository } from '@repositories/users-repository'
import { UserNotFoundError } from '@use-cases/errors/user/user-not-found-error'
import { hash } from 'bcryptjs'
import { InvalidTokenError } from '../errors/user/invalid-token-error'

interface ResetPasswordUseCaseRequest {
  newPassword: string
  token: string
}

interface ResetPasswordUseCaseResponse {
  user: UserWithDetails
}

export class ResetPasswordUseCase {
  constructor(private readonly usersRepository: UsersRepository) {}

  async execute({
    newPassword,
    token,
  }: ResetPasswordUseCaseRequest): Promise<ResetPasswordUseCaseResponse> {
    const tokenHash = crypto
      .createHash('sha256')
      .update(token, 'utf-8')
      .digest('hex')

    const userFound = await this.usersRepository.validateUserToken(tokenHash)

    const passwordHash = await hash(newPassword, env.HASH_SALT_ROUNDS)

    if (!userFound) {
      throw new UserNotFoundError()
    }

    if (userFound.recoveryPasswordTokenExpiresAt < new Date()) {
      throw new InvalidTokenError()
    }

    const user = await this.usersRepository.changePassword(
      userFound.id,
      passwordHash,
    )

    return { user }
  }
}
