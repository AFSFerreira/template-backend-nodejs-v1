import type { CreateUserUseCaseRequest, CreateUserUseCaseResponse } from '@custom-types/use-cases/user/create-user'
import type { ApiError } from '@errors/api-error'
import type { UsersRepository } from '@repositories/users-repository'
import { EMAIL_VALIDATION_EXPIRATION_TIME } from '@constants/timing-constants'
import { RANDOM_BYTES_NUMBER } from '@constants/validation-constants'
import { sendEmailEnqueued } from '@jobs/queues/facades/email-queue-facade'
import { logger } from '@lib/pino'
import { tsyringeTokens } from '@lib/tsyringe/helpers/tokens'
import { EMAIL_VERIFICATION_SUBJECT } from '@messages/emails/user-emails'
import { EMAIL_VERIFICATION_SEND_ERROR, SUCCESSFUL_USER_CREATION } from '@messages/loggings/models/user-loggings'
import { HashService } from '@services/hashes/hash-service'
import { ConfirmAccountRenderer } from '@services/renderers/user/emails/confirm-account-renderer'
import { MxRecordValidationService } from '@services/validators/validate-mx-record'
import { InvalidEmailDomainError } from '@use-cases/errors/user/invalid-email-domain-error'
import { UserAlreadyExistsError } from '@use-cases/errors/user/user-already-exists-error'
import { UserWithSameUsername } from '@use-cases/errors/user/user-with-same-username-error'
import { getTrueMapping } from '@utils/mappers/get-true-mapping'
import { inject, singleton } from 'tsyringe'
import { UserWithSameEmail } from '../errors/user/user-with-same-email-error'

@singleton()
export class CreateUserUseCase {
  constructor(
    @inject(tsyringeTokens.repositories.users)
    private readonly usersRepository: UsersRepository,

    @inject(HashService)
    private readonly hashService: HashService,

    @inject(ConfirmAccountRenderer)
    private readonly confirmAccountRenderer: ConfirmAccountRenderer,

    @inject(MxRecordValidationService)
    private readonly mxRecordValidationService: MxRecordValidationService,
  ) {}

  async execute(registerUseCaseInput: CreateUserUseCaseRequest): Promise<CreateUserUseCaseResponse> {
    const isValidEmailDomain = await this.mxRecordValidationService.validate(registerUseCaseInput.email)

    if (!isValidEmailDomain) {
      throw new InvalidEmailDomainError()
    }

    const passwordHash = await this.hashService.hashPassword(registerUseCaseInput.password)

    const emailVerificationToken = this.hashService.generateToken(RANDOM_BYTES_NUMBER)
    const emailVerificationTokenHash = this.hashService.hashToken(emailVerificationToken)
    const emailVerificationTokenExpiresAt = new Date(Date.now() + EMAIL_VALIDATION_EXPIRATION_TIME)

    const userAlreadyExists = await this.usersRepository.findConflictingUser({
      email: registerUseCaseInput.email,
      username: registerUseCaseInput.username,
    })

    if (userAlreadyExists) {
      const apiError = getTrueMapping<ApiError>([
        {
          expression: userAlreadyExists.email === registerUseCaseInput.email,
          value: new UserWithSameEmail(),
        },
        {
          expression: userAlreadyExists.username === registerUseCaseInput.username,
          value: new UserWithSameUsername(),
        },
      ])

      if (!apiError) {
        throw new UserAlreadyExistsError()
      }

      throw apiError
    }

    const createdUser = await this.usersRepository.create({
      ...registerUseCaseInput,
      passwordHash,
      emailVerificationTokenHash,
      emailVerificationTokenExpiresAt,
    })

    const { html, text, attachments } = await this.confirmAccountRenderer.render(
      {
        fullName: createdUser.fullName,
        email: createdUser.email,
        token: emailVerificationToken,
      },
      { minify: 'email' },
    )

    await sendEmailEnqueued({
      to: createdUser.email,
      subject: EMAIL_VERIFICATION_SUBJECT,
      message: text,
      html,
      attachments,
      logging: {
        errorMessage: EMAIL_VERIFICATION_SEND_ERROR,
        context: { userId: createdUser.id, userEmail: createdUser.email },
      },
    })

    logger.info({ userId: createdUser.id, fullName: createdUser.fullName }, SUCCESSFUL_USER_CREATION)

    return { user: createdUser }
  }
}
