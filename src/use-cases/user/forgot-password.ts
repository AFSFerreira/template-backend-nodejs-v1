import type {
  ForgotPasswordUseCaseRequest,
  ForgotPasswordUseCaseResponse,
} from '@custom-types/use-cases/user/forgot-password'
import type { DatabaseContext } from '@lib/prisma/helpers/database-context'
import type { UsersRepository } from '@repositories/users-repository'
import { RECOVERY_PASSWORD_EXPIRATION_TIME } from '@constants/timing-constants'
import { RANDOM_BYTES_NUMBER } from '@constants/validation-constants'
import { logger } from '@lib/logger'
import { logError } from '@lib/logger/helpers/log-error'
import { tokens } from '@lib/tsyringe/helpers/tokens'
import { PASSWORD_RESET_SUBJECT } from '@messages/emails/user-emails'
import { CHANGE_PASSWORD_REQUEST_SUCCESSFUL, PASSWORD_RESET_EMAIL_FAILED } from '@messages/loggings/user-loggings'
import { sendEmail } from '@services/external/send-email'
import { forgotPasswordHtmlTemplate } from '@templates/forgot-password/forgot-password-html'
import { forgotPasswordTextTemplate } from '@templates/forgot-password/forgot-password-text'
import { generateToken } from '@utils/tokens/generate-token'
import { hashToken } from '@utils/tokens/hash-token'
import { ensureExists } from '@utils/validators/ensure'
import { inject, injectable } from 'tsyringe'
import { UserNotFoundForPasswordResetError } from '../errors/user/user-not-found-for-password-reset-error'

@injectable()
export class ForgotPasswordUseCase {
  constructor(
    @inject(tokens.repositories.users)
    private readonly usersRepository: UsersRepository,

    @inject(tokens.infra.database)
    private readonly dbContext: DatabaseContext,
  ) {}

  async execute({ login }: ForgotPasswordUseCaseRequest): Promise<ForgotPasswordUseCaseResponse> {
    const recoveryPasswordToken = generateToken(RANDOM_BYTES_NUMBER)
    const recoveryPasswordTokenHash = hashToken(recoveryPasswordToken)
    const recoveryPasswordTokenExpiresAt = new Date(Date.now() + RECOVERY_PASSWORD_EXPIRATION_TIME)

    const user = await this.dbContext.runInTransaction(async () => {
      const userAlreadyExists = ensureExists({
        value: await this.usersRepository.findByEmails(login),
        error: new UserNotFoundForPasswordResetError(),
      })

      const tokenData = {
        recoveryPasswordTokenHash,
        recoveryPasswordTokenExpiresAt,
      }

      const updatedUser = await this.usersRepository.setPasswordToken({
        id: userAlreadyExists.id,
        tokenData,
      })

      return updatedUser
    })

    const emailInfo = {
      email: user.email,
      username: user.username,
      fullName: user.fullName,
      token: recoveryPasswordToken,
    }

    try {
      await sendEmail({
        to: login,
        subject: PASSWORD_RESET_SUBJECT,
        message: forgotPasswordTextTemplate(emailInfo),
        html: forgotPasswordHtmlTemplate(emailInfo),
      })
    } catch (error) {
      logError({
        error,
        context: { userPublicId: user.publicId, userEmail: user.email },
        message: PASSWORD_RESET_EMAIL_FAILED,
      })
    }

    logger.info({ login }, CHANGE_PASSWORD_REQUEST_SUCCESSFUL)

    return { user, token: recoveryPasswordToken }
  }
}
