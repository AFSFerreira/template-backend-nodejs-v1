import type {
  ChangePasswordUseCaseRequest,
  ChangePasswordUseCaseResponse,
} from '@custom-types/use-cases/user/update-password'
import type { DatabaseContext } from '@lib/prisma/helpers/database-context'
import type { UsersRepository } from '@repositories/users-repository'
import { logger } from '@lib/logger'
import { tsyringeTokens } from '@lib/tsyringe/helpers/tokens'
import { PASSWORD_UPDATED_SUCCESSFULLY } from '@messages/loggings/models/user-loggings'
import { IncorrectOldPasswordError } from '@use-cases/errors/user/incorrect-old-password-error'
import { UserNotFoundError } from '@use-cases/errors/user/user-not-found-error'
import { hashPassword } from '@utils/hashes/hash-password'
import { ensureExists } from '@utils/validators/ensure'
import { compare } from 'bcryptjs'
import { inject, injectable } from 'tsyringe'

@injectable()
export class ChangePasswordUseCase {
  constructor(
    @inject(tsyringeTokens.repositories.users)
    private readonly usersRepository: UsersRepository,

    @inject(tsyringeTokens.infra.database)
    private readonly dbContext: DatabaseContext,
  ) {}

  async execute({
    userPublicId,
    oldPassword,
    newPassword,
  }: ChangePasswordUseCaseRequest): Promise<ChangePasswordUseCaseResponse> {
    const newPasswordHash = await hashPassword(newPassword)

    await this.dbContext.runInTransaction(async () => {
      const user = ensureExists({
        value: await this.usersRepository.findByPublicId(userPublicId),
        error: new UserNotFoundError(),
      })

      const isOldPasswordCorrect = await compare(oldPassword, user.passwordHash)

      if (!isOldPasswordCorrect) {
        throw new IncorrectOldPasswordError()
      }

      if (oldPassword === newPassword) return

      await this.usersRepository.changePassword({
        id: user.id,
        passwordHash: newPasswordHash,
      })
    })

    logger.info({ userPublicId }, PASSWORD_UPDATED_SUCCESSFULLY)

    return {}
  }
}
