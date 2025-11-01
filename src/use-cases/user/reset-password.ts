import crypto from 'node:crypto'
import { env } from '@env/index'
import type { User } from '@prisma/client'
import type { UsersRepository } from '@repositories/users-repository'
import { UserNotFoundError } from '@use-cases/errors/user/user-not-found-error'
import { ensureExists } from '@utils/ensure'
import { hash } from 'bcryptjs'
import { InvalidTokenError } from '../errors/user/invalid-token-error'

interface ResetPasswordUseCaseRequest {
  newPassword: string
  token: string
}

interface ResetPasswordUseCaseResponse {
  user: User
}

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

    return { user }
  }
}
