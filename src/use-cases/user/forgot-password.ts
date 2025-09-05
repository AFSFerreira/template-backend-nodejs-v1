import crypto from 'node:crypto'
import { RANDOM_BYTES_NUMBER } from '@constants/validation-constants'
import type { UserWithDetails } from '@custom-types/user-with-details'
import type { UsersRepository } from '@repositories/users-repository'
import { emailSchema } from '@schemas/utils/primitives/email-schema'
import ms from 'ms'
import { UserNotFoundForPasswordResetError } from '../errors/user/user-not-found-for-password-reset-error'

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

    const recoveryPasswordToken = crypto
      .randomBytes(RANDOM_BYTES_NUMBER)
      .toString('hex')

    const recoveryPasswordTokenHash = crypto
      .createHash('sha256')
      .update(recoveryPasswordToken, 'utf-8')
      .digest('hex')

    const recoveryPasswordTokenExpiresAt = new Date(Date.now() + ms('15m'))

    const tokenData = {
      recoveryPasswordTokenHash,
      recoveryPasswordTokenExpiresAt,
    }

    if (!userAlreadyExists) {
      throw new UserNotFoundForPasswordResetError()
    }

    const user = await this.usersRepository.setPasswordToken(
      userAlreadyExists.id,
      tokenData,
    )

    return { user, token: recoveryPasswordToken }
  }
}
