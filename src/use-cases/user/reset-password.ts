import type { UserWithDetails } from '@custom-types/user-with-details'
import { env } from '@env/index'
import type { UsersRepository } from '@repositories/users-repository'
import { hash } from 'bcryptjs'
import { InvalidTokenError } from '../errors/invalid-token-error'

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
    const userAlreadyExists =
      await this.usersRepository.validateUserToken(token)

    if (!userAlreadyExists) {
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
