import type {
  UpdatePasswordUseCaseRequest,
  UpdatePasswordUseCaseResponse,
} from '@custom-types/use-cases/user/update-password'
import type { DatabaseContext } from '@lib/prisma/helpers/database-context'
import type { UsersRepository } from '@repositories/users-repository'
import { env } from '@env/index'
import { logger } from '@lib/logger'
import { tsyringeTokens } from '@lib/tsyringe/helpers/tokens'
import { PASSWORD_UPDATED_SUCCESSFULLY } from '@messages/loggings/models/user-loggings'
import { IncorrectOldPasswordError } from '@use-cases/errors/user/incorrect-old-password-error'
import { UserNotFoundError } from '@use-cases/errors/user/user-not-found-error'
import { ensureExists } from '@utils/validators/ensure'
import { compare, hash } from 'bcryptjs'
import { inject, injectable } from 'tsyringe'

@injectable()
export class UpdatePasswordUseCase {
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
  }: UpdatePasswordUseCaseRequest): Promise<UpdatePasswordUseCaseResponse> {
    await this.dbContext.runInTransaction(async () => {
      const user = ensureExists({
        value: await this.usersRepository.findByPublicId(userPublicId),
        error: new UserNotFoundError(),
      })

      const isOldPasswordCorrect = await compare(oldPassword, user.passwordHash)

      if (!isOldPasswordCorrect) {
        throw new IncorrectOldPasswordError()
      }

      const newPasswordHash = await hash(newPassword, env.HASH_SALT_ROUNDS)

      await this.usersRepository.changePassword({
        id: user.id,
        passwordHash: newPasswordHash,
      })
    })

    logger.info({ userPublicId }, PASSWORD_UPDATED_SUCCESSFULLY)

    return { success: true }
  }
}
