import type {
  ChangePasswordUseCaseRequest,
  ChangePasswordUseCaseResponse,
} from '@custom-types/use-cases/user/update-password'
import type { UsersRepository } from '@repositories/users-repository'
import { logger } from '@lib/logger'
import { tsyringeTokens } from '@lib/tsyringe/helpers/tokens'
import { PASSWORD_UPDATED_SUCCESSFULLY } from '@messages/loggings/models/user-loggings'
import { HashService } from '@services/hashes/hash-service'
import { IncorrectOldPasswordError } from '@use-cases/errors/user/incorrect-old-password-error'
import { UserNotFoundError } from '@use-cases/errors/user/user-not-found-error'
import { ensureExists } from '@utils/validators/ensure'
import { inject, injectable } from 'tsyringe'

@injectable()
export class ChangePasswordUseCase {
  constructor(
    @inject(tsyringeTokens.repositories.users)
    private readonly usersRepository: UsersRepository,
  ) {}

  async execute({
    userPublicId,
    oldPassword,
    newPassword,
  }: ChangePasswordUseCaseRequest): Promise<ChangePasswordUseCaseResponse> {
    const newPasswordHash = await HashService.hashPassword(newPassword)

    const user = ensureExists({
      value: await this.usersRepository.findByPublicId(userPublicId),
      error: new UserNotFoundError(),
    })

    const isOldPasswordCorrect = await HashService.comparePassword({
      password: oldPassword,
      hashedPassword: user.passwordHash,
    })

    if (!isOldPasswordCorrect) {
      throw new IncorrectOldPasswordError()
    }

    if (oldPassword === newPassword) return {}

    await this.usersRepository.changePassword({
      id: user.id,
      passwordHash: newPasswordHash,
    })

    logger.info({ userPublicId }, PASSWORD_UPDATED_SUCCESSFULLY)

    return {}
  }
}
