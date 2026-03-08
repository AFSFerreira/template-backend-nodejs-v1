import type { UpdateUserPermissionsUseCaseRequest } from '@custom-types/use-cases/user/update-user-permissions'
import type { DatabaseContext } from '@lib/prisma/helpers/database-context'
import type { DirectorBoardRepository } from '@repositories/directors-board-repository'
import type { UserActionAuditsRepository } from '@repositories/user-action-audits-repository'
import type { UsersRepository } from '@repositories/users-repository'
import { logger } from '@lib/pino'
import { tsyringeTokens } from '@lib/tsyringe/helpers/tokens'
import { USER_PERMISSIONS_UPDATED_SUCCESSFULLY } from '@messages/loggings/models/user-loggings'
import { SystemActionType, UserRoleType } from '@prisma/generated/enums'
import { isManagerPermissions } from '@utils/guards/is-manager-permissions'
import { ensureExists } from '@utils/validators/ensure'
import { inject, injectable } from 'tsyringe'
import { AdminCannotUpdateOwnRoleError } from '../errors/user/admin-cannot-update-own-role-error'
import { UserNotFoundError } from '../errors/user/user-not-found-error'

@injectable()
export class UpdateUserPermissionsUseCase {
  constructor(
    @inject(tsyringeTokens.repositories.users)
    private readonly usersRepository: UsersRepository,

    @inject(tsyringeTokens.repositories.directorsBoard)
    private readonly directorBoardRepository: DirectorBoardRepository,

    @inject(tsyringeTokens.repositories.userActionAudits)
    private readonly userActionAuditsRepository: UserActionAuditsRepository,

    @inject(tsyringeTokens.infra.database)
    private readonly dbContext: DatabaseContext,
  ) {}

  async execute({ publicId, data, audit }: UpdateUserPermissionsUseCaseRequest): Promise<void> {
    const user = ensureExists({
      value: await this.usersRepository.findByPublicId(publicId),
      error: new UserNotFoundError(),
    })

    if (user.role === UserRoleType.ADMIN) {
      throw new AdminCannotUpdateOwnRoleError()
    }

    const actor = ensureExists({
      value: await this.usersRepository.findByPublicId(audit.actorPublicId),
      error: new UserNotFoundError(),
    })

    const isNotManagerPermissions = !isManagerPermissions(data)

    await this.dbContext.runInTransaction(async () => {
      await this.usersRepository.updateRole({ id: user.id, role: data.role })

      if (isNotManagerPermissions) {
        await this.directorBoardRepository.deleteByUserId(user.id)
      }

      await this.userActionAuditsRepository.create({
        actionType: SystemActionType.ROLE_CHANGED,
        actorId: actor.id,
        targetId: user.id,
        ipAddress: audit.ipAddress,
      })
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
