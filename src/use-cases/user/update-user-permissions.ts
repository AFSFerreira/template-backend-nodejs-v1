import type { UpdateUserPermissionsUseCaseRequest } from '@custom-types/use-cases/user/update-user-permissions'
import type { DatabaseContext } from '@lib/prisma/helpers/database-context'
import type { DirectorBoardRepository } from '@repositories/directors-board-repository'
import type { UsersRepository } from '@repositories/users-repository'
import { logger } from '@lib/logger'
import { tokens } from '@lib/tsyringe/helpers/tokens'
import { USER_PERMISSIONS_UPDATED_SUCCESSFULLY } from '@messages/loggings/user-loggings'
import { UserRoleType } from '@prisma/client'
import { isManagerPermissions } from '@services/guards/is-manager-permissions'
import { ensureExists } from '@utils/validators/ensure'
import { inject, injectable } from 'tsyringe'
import { AdminRoleAlreadyAssignedError } from '../errors/user/admin-role-already-assigned-error'
import { UserNotFoundError } from '../errors/user/user-not-found-error'

@injectable()
export class UpdateUserPermissionsUseCase {
  constructor(
    @inject(tokens.repositories.users)
    private readonly usersRepository: UsersRepository,

    @inject(tokens.repositories.directorsBoard)
    private readonly directorBoardRepository: DirectorBoardRepository,

    @inject(tokens.infra.database)
    private readonly dbContext: DatabaseContext,
  ) {}

  async execute({ publicId, data }: UpdateUserPermissionsUseCaseRequest): Promise<void> {
    const user = await this.dbContext.runInTransaction(async () => {
      if (data.role === UserRoleType.ADMIN) {
        throw new AdminRoleAlreadyAssignedError()
      }

      const foundUser = ensureExists({
        value: await this.usersRepository.findByPublicId(publicId),
        error: new UserNotFoundError(),
      })

      await this.usersRepository.updateRole({ id: foundUser.id, role: data.role })

      if (!isManagerPermissions(data)) {
        await this.directorBoardRepository.deleteByUserId(foundUser.id)
      }

      return foundUser
    })

    logger.info(
      {
        userId: user.id,
        role: data.role,
        directorPositionPublicId: isManagerPermissions(data) ? data.directorPositionPublicId : undefined,
      },
      USER_PERMISSIONS_UPDATED_SUCCESSFULLY,
    )
  }
}
