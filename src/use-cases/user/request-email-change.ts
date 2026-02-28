import type {
  RequestEmailChangeUseCaseRequest,
  RequestEmailChangeUseCaseResponse,
} from '@custom-types/use-cases/user/request-email-change'
import type { UsersRepository } from '@repositories/users-repository'
import { EMAIL_CHANGE_EXPIRATION_TIME } from '@constants/timing-constants'
import { RANDOM_BYTES_NUMBER } from '@constants/validation-constants'
import { sendEmailEnqueued } from '@jobs/queues/facades/email-queue-facade'
import { logger } from '@lib/pino'
import { tsyringeTokens } from '@lib/tsyringe/helpers/tokens'
import { EMAIL_CHANGE_VERIFICATION_SUBJECT } from '@messages/emails/user-emails'
import {
  EMAIL_CHANGE_EMAIL_SEND_ERROR,
  EMAIL_CHANGE_REQUESTED_SUCCESSFULLY,
} from '@messages/loggings/models/user-loggings'
import { HashService } from '@services/hashes/hash-service'
import { ChangeEmailRenderer } from '@services/renderers/emails/change-email-renderer'
import { InvalidEmailDomainError } from '@use-cases/errors/user/invalid-email-domain-error'
import { UserNotFoundError } from '@use-cases/errors/user/user-not-found-error'
import { UserWithSameEmail } from '@use-cases/errors/user/user-with-same-email-error'
import { ensureExists, ensureNotExists } from '@utils/validators/ensure'
import { hasValidMxRecord } from '@utils/validators/validate-mx-record'
import { inject, injectable } from 'tsyringe'

@injectable()
export class RequestEmailChangeUseCase {
  constructor(
    @inject(tsyringeTokens.repositories.users)
    private readonly usersRepository: UsersRepository,
  ) {}

  async execute({
    userPublicId,
    newEmail,
  }: RequestEmailChangeUseCaseRequest): Promise<RequestEmailChangeUseCaseResponse> {
    const isValidEmailDomain = await hasValidMxRecord(newEmail)

    if (!isValidEmailDomain) {
      throw new InvalidEmailDomainError()
    }

    const emailVerificationToken = HashService.generateToken(RANDOM_BYTES_NUMBER)
    const emailVerificationTokenHash = HashService.hashToken(emailVerificationToken)
    const emailVerificationTokenExpiresAt = new Date(Date.now() + EMAIL_CHANGE_EXPIRATION_TIME)

    const userFound = ensureExists({
      value: await this.usersRepository.findByPublicId(userPublicId),
      error: new UserNotFoundError(),
    })

    ensureNotExists({
      value: await this.usersRepository.findByPrimaryEmail(newEmail),
      error: new UserWithSameEmail(),
    })

    const user = await this.usersRepository.setEmailChangeToken({
      id: userFound.id,
      newEmail,
      emailVerificationTokenHash,
      emailVerificationTokenExpiresAt,
    })

    const { html, text, attachments } = new ChangeEmailRenderer().render({
      fullName: user.fullName,
      oldEmail: user.email,
      newEmail,
      token: emailVerificationToken,
    })

    await sendEmailEnqueued({
      to: newEmail,
      subject: EMAIL_CHANGE_VERIFICATION_SUBJECT,
      message: text,
      html,
      attachments,
      logging: {
        errorMessage: EMAIL_CHANGE_EMAIL_SEND_ERROR,
        context: { userPublicId: user.publicId, newEmail },
      },
    })

    logger.info(
      {
        userPublicId: user.publicId,
        oldEmail: user.email,
        newEmail,
      },
      EMAIL_CHANGE_REQUESTED_SUCCESSFULLY,
    )

    return {}
  }
}
