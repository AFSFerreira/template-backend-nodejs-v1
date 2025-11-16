import crypto from 'node:crypto'
import { RANDOM_BYTES_NUMBER } from '@constants/validation-constants'
import { logger } from '@lib/logger'
import { CHANGE_PASSWORD_SUCCESSFUL } from '@messages/loggings'
import type { User } from '@prisma/client'
import type { UsersRepository } from '@repositories/users-repository'
import ms from 'ms'
import { UserNotFoundForPasswordResetError } from '../errors/user/user-not-found-for-password-reset-error'

interface ForgotPasswordUseCaseRequest {
  login: string
}

interface ForgotPasswordUseCaseResponse {
  user: User
  token: string
}

export class ForgotPasswordUseCase {
  constructor(private readonly usersRepository: UsersRepository) {}

  async execute({ login }: ForgotPasswordUseCaseRequest): Promise<ForgotPasswordUseCaseResponse> {
    const userAlreadyExists: User | null = await this.usersRepository.findByEmails(login)

    const recoveryPasswordToken = crypto.randomBytes(RANDOM_BYTES_NUMBER).toString('hex')

    const recoveryPasswordTokenHash = crypto.createHash('sha256').update(recoveryPasswordToken, 'utf-8').digest('hex')

    const recoveryPasswordTokenExpiresAt = new Date(Date.now() + ms('15m'))

    const tokenData = {
      recoveryPasswordTokenHash,
      recoveryPasswordTokenExpiresAt,
    }

    if (!userAlreadyExists) {
      throw new UserNotFoundForPasswordResetError()
    }

    const user = await this.usersRepository.setPasswordToken({
      id: userAlreadyExists.id,
      tokenData,
    })

    logger.info({ login }, CHANGE_PASSWORD_SUCCESSFUL)

    return { user, token: recoveryPasswordToken }
  }
}
