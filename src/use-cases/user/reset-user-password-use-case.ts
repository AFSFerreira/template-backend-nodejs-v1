import { hash } from 'bcryptjs'
import { InvalidTokenError } from '../errors/invalid-token-error'
import type { UserWithDetails } from '@/@types/user-with-details'
import { env } from '@/env'
import type { UsersRepository } from '@/repositories/users-repository'

interface ResetUserPasswordUseCaseRequest {
  newPassword: string
  token: string
}

interface ResetUserPasswordUseCaseResponse {
  user: UserWithDetails
}

export class ResetUserPasswordUseCase {
  constructor(private readonly usersRepository: UsersRepository) {}

  async execute({
    newPassword,
    token,
  }: ResetUserPasswordUseCaseRequest): Promise<ResetUserPasswordUseCaseResponse> {
    const userAlreadyExists =
      await this.usersRepository.validateUserToken(token)

    if (userAlreadyExists === null) {
      throw new InvalidTokenError()
    }

    const passwordHash = await hash(newPassword, env.HASH_SALT_ROUNDS)

    const user = await this.usersRepository.changePassword(
      userAlreadyExists.id,
      passwordHash,
    )

    return { user }
  }
}
