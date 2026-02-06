import type {
  TransferAdminRoleUseCaseRequest,
  TransferAdminRoleUseCaseResponse,
} from '@custom-types/use-cases/user/transfer-admin-role'
import type { DatabaseContext } from '@lib/prisma/helpers/database-context'
import type { UsersRepository } from '@repositories/users-repository'
import { logger } from '@lib/logger'
import { tsyringeTokens } from '@lib/tsyringe/helpers/tokens'
import { ADMIN_ROLE_TRANSFERRED_SUCCESSFULLY } from '@messages/loggings/models/user-loggings'
import { UserRoleType } from '@prisma/generated/enums'
import { ensureExists } from '@utils/validators/ensure'
import { inject, injectable } from 'tsyringe'
import { CannotTransferAdminToSelfError } from '../errors/user/cannot-transfer-admin-to-self-error'
import { UserNotFoundError } from '../errors/user/user-not-found-error'

@injectable()
export class TransferAdminRoleUseCase {
  constructor(
    @inject(tsyringeTokens.repositories.users)
    private readonly usersRepository: UsersRepository,

    @inject(tsyringeTokens.infra.database)
    private readonly dbContext: DatabaseContext,
  ) {}

  async execute({
    currentAdminPublicId,
    newAdminPublicId,
  }: TransferAdminRoleUseCaseRequest): Promise<TransferAdminRoleUseCaseResponse> {
    if (currentAdminPublicId === newAdminPublicId) {
      throw new CannotTransferAdminToSelfError()
    }

    const { currentAdmin, newAdmin } = await this.dbContext.runInTransaction(async () => {
      const currentAdmin = ensureExists({
        value: await this.usersRepository.findByPublicId(currentAdminPublicId),
        error: new UserNotFoundError(),
      })

      const newAdmin = ensureExists({
        value: await this.usersRepository.findByPublicId(newAdminPublicId),
        error: new UserNotFoundError(),
      })

      await this.usersRepository.updateRole({
        id: currentAdmin.id,
        role: UserRoleType.MANAGER,
      })

      await this.usersRepository.updateRole({
        id: newAdmin.id,
        role: UserRoleType.ADMIN,
      })

      return { currentAdmin, newAdmin }
    })

    logger.info(
      {
        previousAdminPublicId: currentAdmin.publicId,
        newAdminPublicId: newAdmin.publicId,
      },
      ADMIN_ROLE_TRANSFERRED_SUCCESSFULLY,
    )

    return {}
  }
}
