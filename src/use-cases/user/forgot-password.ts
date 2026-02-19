import type {
  ForgotPasswordUseCaseRequest,
  ForgotPasswordUseCaseResponse,
} from '@custom-types/use-cases/user/forgot-password'
import type { UsersRepository } from '@repositories/users-repository'
import { RECOVERY_PASSWORD_EXPIRATION_TIME } from '@constants/timing-constants'
import { RANDOM_BYTES_NUMBER } from '@constants/validation-constants'
import { sendEmailEnqueued } from '@jobs/queues/facades/email-queue-facade'
import { logger } from '@lib/logger'
import { tsyringeTokens } from '@lib/tsyringe/helpers/tokens'
import { PASSWORD_RESET_SUBJECT } from '@messages/emails/user-emails'
import {
  CHANGE_PASSWORD_REQUEST_SUCCESSFUL,
  PASSWORD_RESET_EMAIL_FAILED,
} from '@messages/loggings/models/user-loggings'
import { HashService } from '@services/hashes/hash-service'
import { forgotPasswordHtmlTemplate } from '@templates/user/forgot-password/forgot-password-html'
import { forgotPasswordTextTemplate } from '@templates/user/forgot-password/forgot-password-text'
import { ensureExists } from '@utils/validators/ensure'
import { inject, injectable } from 'tsyringe'
import { UserNotFoundForPasswordResetError } from '../errors/user/user-not-found-for-password-reset-error'

@injectable()
export class ForgotPasswordUseCase {
  constructor(
    @inject(tsyringeTokens.repositories.users)
    private readonly usersRepository: UsersRepository,
  ) {}

  async execute({ login }: ForgotPasswordUseCaseRequest): Promise<ForgotPasswordUseCaseResponse> {
    const recoveryPasswordToken = HashService.generateToken(RANDOM_BYTES_NUMBER)
    const recoveryPasswordTokenHash = HashService.hashToken(recoveryPasswordToken)
    const recoveryPasswordTokenExpiresAt = new Date(Date.now() + RECOVERY_PASSWORD_EXPIRATION_TIME)

    const userAlreadyExists = ensureExists({
      value: await this.usersRepository.findByEmails(login),
      error: new UserNotFoundForPasswordResetError(),
    })

    const tokenData = {
      recoveryPasswordTokenHash,
      recoveryPasswordTokenExpiresAt,
    }

    const user = await this.usersRepository.setPasswordToken({
      id: userAlreadyExists.id,
      tokenData,
    })

    const emailInfo = {
      email: user.email,
      username: user.username,
      fullName: user.fullName,
      token: recoveryPasswordToken,
    }

    // Recuperação de senha enviada para o email escolhido pelo usuário
    const userChosenEmail = user.secondaryEmail && login === user.secondaryEmail ? user.secondaryEmail : user.email

    const { html, attachments } = forgotPasswordHtmlTemplate(emailInfo)

    await sendEmailEnqueued({
      to: userChosenEmail,
      subject: PASSWORD_RESET_SUBJECT,
      message: forgotPasswordTextTemplate(emailInfo),
      html,
      attachments,
      logging: {
        errorMessage: PASSWORD_RESET_EMAIL_FAILED,
        context: { userPublicId: user.publicId, userEmail: userChosenEmail },
      },
    })

    logger.info({ login }, CHANGE_PASSWORD_REQUEST_SUCCESSFUL)

    return { user, token: recoveryPasswordToken }
  }
}
