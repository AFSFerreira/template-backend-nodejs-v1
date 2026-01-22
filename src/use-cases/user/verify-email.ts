import type { VerifyEmailUseCaseRequest, VerifyEmailUseCaseResponse } from '@custom-types/use-cases/user/verify-email'
import type { DatabaseContext } from '@lib/prisma/helpers/database-context'
import type { UsersRepository } from '@repositories/users-repository'
import { logger } from '@lib/logger'
import { tokens } from '@lib/tsyringe/helpers/tokens'
import { EMAIL_VERIFICATION_SUCCESSFUL } from '@messages/loggings/user-loggings'
import { hashToken } from '@utils/tokens/hash-token'
import { ensureExists } from '@utils/validators/ensure'
import { inject, injectable } from 'tsyringe'
import { EmailVerificationNotRequestedError } from '../errors/user/email-verification-not-requested-error'
import { InvalidTokenError } from '../errors/user/invalid-token-error'
import { UserNotFoundError } from '../errors/user/user-not-found-error'

@injectable()
export class VerifyEmailUseCase {
  constructor(
    @inject(tokens.repositories.users)
    private readonly usersRepository: UsersRepository,

    @inject(tokens.infra.database)
    private readonly dbContext: DatabaseContext,
  ) {}

  async execute({ token }: VerifyEmailUseCaseRequest): Promise<VerifyEmailUseCaseResponse> {
    const emailVerificationTokenHash = hashToken(token)

    const { user } = await this.dbContext.runInTransaction(async () => {
      const userFound = ensureExists({
        value: await this.usersRepository.validateEmailVerificationToken(emailVerificationTokenHash),
        error: new UserNotFoundError(),
      })

      if (!userFound.emailVerificationTokenHash || !userFound.emailVerificationTokenExpiresAt) {
        throw new EmailVerificationNotRequestedError()
      }

      if (new Date() > userFound.emailVerificationTokenExpiresAt) {
        throw new InvalidTokenError()
      }

      const updatedUser = await this.usersRepository.confirmEmailVerification(userFound.id)

      return { user: updatedUser }
    })

    logger.info({ userPublicId: user.publicId, email: user.email }, EMAIL_VERIFICATION_SUCCESSFUL)

    return { user }
  }
}
