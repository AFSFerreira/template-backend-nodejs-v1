import type {
  ForgotPasswordUseCaseRequest,
  ForgotPasswordUseCaseResponse,
} from '@custom-types/use-cases/user/forgot-password'
import type { UsersRepository } from '@repositories/users-repository'
import { RECOVERY_PASSWORD_EXPIRATION_TIME } from '@constants/timing-constants'
import { RANDOM_BYTES_NUMBER } from '@constants/validation-constants'
import { sendEmailEnqueued } from '@jobs/queues/facades/email-queue-facade'
import { logger } from '@lib/pino'
import { tsyringeTokens } from '@lib/tsyringe/helpers/tokens'
import { PASSWORD_RESET_SUBJECT } from '@messages/emails/user-emails'
import {
  CHANGE_PASSWORD_REQUEST_SUCCESSFUL,
  PASSWORD_RESET_EMAIL_FAILED,
} from '@messages/loggings/models/user-loggings'
import { HashService } from '@services/hashes/hash-service'
import { ForgotPasswordRenderer } from '@services/renderers/user/emails/forgot-password-renderer'
import { ensureExists } from '@utils/validators/ensure'
import { inject, singleton } from 'tsyringe'
import { UserNotFoundForPasswordResetError } from '../errors/user/user-not-found-for-password-reset-error'

@singleton()
export class ForgotPasswordUseCase {
  constructor(
    @inject(tsyringeTokens.repositories.users)
    private readonly usersRepository: UsersRepository,

    @inject(HashService)
    private readonly hashService: HashService,

    @inject(ForgotPasswordRenderer)
    private readonly forgotPasswordRenderer: ForgotPasswordRenderer,
  ) {}

  async execute({ login }: ForgotPasswordUseCaseRequest): Promise<ForgotPasswordUseCaseResponse> {
    const recoveryPasswordToken = this.hashService.generateToken(RANDOM_BYTES_NUMBER)
    const recoveryPasswordTokenHash = this.hashService.hashToken(recoveryPasswordToken)
    const recoveryPasswordTokenExpiresAt = new Date(Date.now() + RECOVERY_PASSWORD_EXPIRATION_TIME)

    const userAlreadyExists = ensureExists({
      value: await this.usersRepository.findByEmail(login),
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

    const { html, text, attachments } = await this.forgotPasswordRenderer.render(
      {
        email: user.email,
        username: user.username,
        fullName: user.fullName,
        token: recoveryPasswordToken,
      },
      { minify: 'email' },
    )

    await sendEmailEnqueued({
      to: login,
      subject: PASSWORD_RESET_SUBJECT,
      message: text,
      html,
      attachments,
      logging: {
        errorMessage: PASSWORD_RESET_EMAIL_FAILED,
        context: { userId: user.id, userEmail: login },
      },
    })

    logger.info({ login }, CHANGE_PASSWORD_REQUEST_SUCCESSFUL)

    return { user, token: recoveryPasswordToken }
  }
}
