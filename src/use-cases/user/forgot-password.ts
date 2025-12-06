import crypto from 'node:crypto'
import { RANDOM_BYTES_NUMBER } from '@constants/validation-constants'
import type {
  ForgotPasswordUseCaseRequest,
  ForgotPasswordUseCaseResponse,
} from '@custom-types/use-cases/user/forgot-password'
import { logger } from '@lib/logger'
import { tokens } from '@lib/tsyringe/helpers/tokens'
import { CHANGE_PASSWORD_SUCCESSFUL } from '@messages/loggings'
import type { User } from '@prisma/client'
import type { UsersRepository } from '@repositories/users-repository'
import ms from 'ms'
import { inject, injectable } from 'tsyringe'

import { UserNotFoundForPasswordResetError } from '../errors/user/user-not-found-for-password-reset-error'

@injectable()
export class ForgotPasswordUseCase {
  constructor(
    @inject(tokens.repositories.users)
    private readonly usersRepository: UsersRepository,
  ) {}

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
