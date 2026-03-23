import type {
  ChangePasswordUseCaseRequest,
  ChangePasswordUseCaseResponse,
} from '@custom-types/use-cases/user/update-password'
import type { UsersRepository } from '@repositories/users-repository'
import { logger } from '@lib/pino'
import { tsyringeTokens } from '@lib/tsyringe/helpers/tokens'
import { PASSWORD_UPDATED_SUCCESSFULLY } from '@messages/loggings/models/user-loggings'
import { HashService } from '@services/hashes/hash-service'
import { IncorrectOldPasswordError } from '@use-cases/errors/user/incorrect-old-password-error'
import { UserNotFoundError } from '@use-cases/errors/user/user-not-found-error'
import { ensureExists } from '@utils/validators/ensure'
import { inject, singleton } from 'tsyringe'

@singleton()
export class ChangePasswordUseCase {
  constructor(
    @inject(tsyringeTokens.repositories.users)
    private readonly usersRepository: UsersRepository,

    @inject(HashService)
    private readonly hashService: HashService,
  ) {}

  async execute({
    userId,
    oldPassword,
    newPassword,
  }: ChangePasswordUseCaseRequest): Promise<ChangePasswordUseCaseResponse> {
    const newPasswordHash = await this.hashService.hashPassword(newPassword)

    const user = ensureExists({
      value: await this.usersRepository.findById(userId),
      error: new UserNotFoundError(),
    })

    const isOldPasswordCorrect = await this.hashService.comparePassword({
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

    logger.info({ userId }, PASSWORD_UPDATED_SUCCESSFULLY)

    return {}
  }
}
