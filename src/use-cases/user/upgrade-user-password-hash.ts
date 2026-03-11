import type {
  UpgradeUserPasswordHashUseCaseRequest,
  UpgradeUserPasswordHashUseCaseResponse,
} from '@custom-types/use-cases/user/upgrade-user-password-hash'
import type { UsersRepository } from '@repositories/users-repository'
import { logger } from '@lib/pino'
import { tsyringeTokens } from '@lib/tsyringe/helpers/tokens'
import { PASSWORD_HASH_UPGRADED_SUCCESSFULLY } from '@messages/loggings/models/user-loggings'
import { HashService } from '@services/hashes/hash-service'
import { inject, singleton } from 'tsyringe'

@singleton()
export class UpgradeUserPasswordHashUseCase {
  constructor(
    @inject(tsyringeTokens.repositories.users)
    private readonly usersRepository: UsersRepository,

    @inject(HashService)
    private readonly hashService: HashService,
  ) {}

  async execute({
    userId,
    password,
  }: UpgradeUserPasswordHashUseCaseRequest): Promise<UpgradeUserPasswordHashUseCaseResponse> {
    const newPasswordHash = await this.hashService.hashPassword(password)

    await this.usersRepository.upgradePasswordHash({
      id: userId,
      passwordHash: newPasswordHash,
    })

    logger.info({ userId }, PASSWORD_HASH_UPGRADED_SUCCESSFULLY)

    return {}
  }
}
