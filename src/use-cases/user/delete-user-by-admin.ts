import type {
  DeleteUserByAdminUseCaseRequest,
  DeleteUserByAdminUseCaseResponse,
} from '@custom-types/use-cases/user/delete-user-by-admin'
import type { DatabaseContext } from '@lib/prisma/helpers/database-context'
import type { UsersRepository } from '@repositories/users-repository'
import { DEFAULT_PROFILE_IMAGE_NAME } from '@constants/static-file-constants'
import { logger } from '@lib/logger'
import { tokens } from '@lib/tsyringe/helpers/tokens'
import { USER_DELETION_BY_ADMIN_SUCCESSFUL } from '@messages/loggings/user-loggings'
import { buildUserProfileImagePath } from '@services/files/build-user-profile-image-path'
import { deleteFile } from '@utils/files/delete-file'
import { ensureExists } from '@utils/validators/ensure'
import { inject, injectable } from 'tsyringe'
import { AdminCannotDeleteSelfError } from '../errors/user/admin-cannot-delete-self-error'
import { UserNotFoundError } from '../errors/user/user-not-found-error'

@injectable()
export class DeleteUserByAdminUseCase {
  constructor(
    @inject(tokens.repositories.users)
    private readonly usersRepository: UsersRepository,

    @inject(tokens.infra.database)
    private readonly dbContext: DatabaseContext,
  ) {}

  async execute({
    adminPublicId,
    targetUserPublicId,
  }: DeleteUserByAdminUseCaseRequest): Promise<DeleteUserByAdminUseCaseResponse> {
    const deletedUser = await this.dbContext.runInTransaction(async () => {
      const user = ensureExists({
        value: await this.usersRepository.findByPublicId(targetUserPublicId),
        error: new UserNotFoundError(),
      })

      const _admin = ensureExists({
        value: this.usersRepository.findByPublicId(adminPublicId),
        error: new UserNotFoundError(),
      })

      if (adminPublicId === targetUserPublicId) {
        throw new AdminCannotDeleteSelfError()
      }

      await this.usersRepository.delete(user.id)

      return user
    })

    // Removendo a antiga foto de perfil do usuário:
    if (deletedUser.profileImage !== DEFAULT_PROFILE_IMAGE_NAME) {
      await deleteFile(buildUserProfileImagePath(deletedUser.profileImage))
    }

    logger.info(
      {
        adminPublicId,
        targetUserPublicId,
        targetUserEmail: deletedUser.email,
      },
      USER_DELETION_BY_ADMIN_SUCCESSFUL,
    )

    return {}
  }
}
