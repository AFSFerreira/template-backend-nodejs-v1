import { randomBytes } from 'crypto'
import {
  EXPIRES_IN_MINUTES,
  TOKEN_LENGTH,
} from '@constants/forgot-password-token'
import type { UserWithDetails } from '@custom-types/user-with-details'
import type { UsersRepository } from '@repositories/users-repository'
import { emailSchema } from '@schemas/utils/email'
import { UserNotFoundForPasswordResetError } from '../errors/user-not-found-for-password-reset-error'

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
    let userAlreadyExists: UserWithDetails | null | undefined

    if (emailSchema.safeParse(login).success) {
      userAlreadyExists = await this.usersRepository.findByEmail(login)
    } else {
      userAlreadyExists = await this.usersRepository.findByUsername(login)
    }

    const recoveryPasswordToken = randomBytes(TOKEN_LENGTH).toString('hex')

    const recoveryPasswordTokenExpiresAt = new Date(
      Date.now() + EXPIRES_IN_MINUTES * 60 * 1000,
    )

    const tokenData = {
      recoveryPasswordToken,
      recoveryPasswordTokenExpiresAt,
    }

    if (!userAlreadyExists) throw new UserNotFoundForPasswordResetError()

    const user = await this.usersRepository.setPasswordToken(
      userAlreadyExists.id,
      tokenData,
    )

    return { user, token: recoveryPasswordToken }
  }
}
