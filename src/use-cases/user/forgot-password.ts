import { randomBytes } from 'crypto'
import { UserNotFoundForPasswordResetError } from '../errors/user-not-found-for-password-reset-error'
import type { UserWithDetails } from '@/@types/user-with-details'
import {
  EXPIRES_IN_MINUTES,
  TOKEN_LENGTH,
} from '@/constants/forgot-password-token'
import type { UsersRepository } from '@/repositories/users-repository'

interface ForgotPasswordUseCaseRequest {
  login: string
}

interface ForgotPasswordUseCaseResponse {
  user: UserWithDetails
  token: string
}

export class ForgotPasswordUseCase {
  constructor(private readonly usersRepository: UsersRepository) {}

  async execute({
    login,
  }: ForgotPasswordUseCaseRequest): Promise<ForgotPasswordUseCaseResponse> {
    const userAlreadyExists =
      await this.usersRepository.findByEmailOrUsername(login)

    const recoveryPasswordToken = randomBytes(TOKEN_LENGTH).toString('hex')

    const recoveryPasswordTokenExpiresAt = new Date(
      Date.now() + EXPIRES_IN_MINUTES * 60 * 1000,
    )

    const tokenData = {
      recoveryPasswordToken,
      recoveryPasswordTokenExpiresAt,
    }

    if (userAlreadyExists === null)
      throw new UserNotFoundForPasswordResetError()

    const user = await this.usersRepository.setPasswordToken(
      userAlreadyExists.id,
      tokenData,
    )

    return { user, token: recoveryPasswordToken }
  }
}
