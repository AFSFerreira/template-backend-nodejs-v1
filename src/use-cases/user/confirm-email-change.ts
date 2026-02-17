import type {
  ConfirmEmailChangeUseCaseRequest,
  ConfirmEmailChangeUseCaseResponse,
} from '@custom-types/use-cases/user/confirm-email-change'
import type { DatabaseContext } from '@lib/prisma/helpers/database-context'
import type { UsersRepository } from '@repositories/users-repository'
import { logger } from '@lib/logger'
import { tsyringeTokens } from '@lib/tsyringe/helpers/tokens'
import { EMAIL_UPDATED_SUCCESSFULLY } from '@messages/loggings/models/user-loggings'
import { EmailChangeNotRequestedError } from '@use-cases/errors/user/email-change-not-requested-error'
import { InvalidTokenError } from '@use-cases/errors/user/invalid-token-error'
import { UserNotFoundError } from '@use-cases/errors/user/user-not-found-error'
import { hashToken } from '@utils/hashes/hash-token'
import { ensureExists } from '@utils/validators/ensure'
import { inject, injectable } from 'tsyringe'

@injectable()
export class ConfirmEmailChangeUseCase {
  constructor(
    @inject(tsyringeTokens.repositories.users)
    private readonly usersRepository: UsersRepository,

    @inject(tsyringeTokens.infra.database)
    private readonly dbContext: DatabaseContext,
  ) {}

  async execute({ token }: ConfirmEmailChangeUseCaseRequest): Promise<ConfirmEmailChangeUseCaseResponse> {
    const emailVerificationTokenHash = hashToken(token)

    const user = await this.dbContext.runInTransaction(async () => {
      const userFound = ensureExists({
        value: await this.usersRepository.validateEmailVerificationToken(emailVerificationTokenHash),
        error: new UserNotFoundError(),
      })

      if (!userFound.emailVerificationTokenHash || !userFound.emailVerificationTokenExpiresAt || !userFound.newEmail) {
        throw new EmailChangeNotRequestedError()
      }

      if (new Date() > userFound.emailVerificationTokenExpiresAt) {
        throw new InvalidTokenError()
      }

      const updatedUser = await this.usersRepository.confirmEmailChange({
        id: userFound.id,
        newEmail: userFound.newEmail,
      })

      return updatedUser
    })

    logger.info(
      {
        userPublicId: user.publicId,
        newEmail: user.email,
      },
      EMAIL_UPDATED_SUCCESSFULLY,
    )

    return { user }
  }
}
