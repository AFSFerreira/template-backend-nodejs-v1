import type {
  DeleteUserByAdminUseCaseRequest,
  DeleteUserByAdminUseCaseResponse,
} from '@custom-types/use-cases/user/delete-user-by-admin'
import type { DatabaseContext } from '@lib/prisma/helpers/database-context'
import type { UsersRepository } from '@repositories/users-repository'
import { DEFAULT_PROFILE_IMAGE_NAME } from '@constants/static-file-constants'
import { fileQueue } from '@jobs/queues/definitions/file-queue'
import { logger } from '@lib/logger'
import { logError } from '@lib/logger/helpers/log-error'
import { tsyringeTokens } from '@lib/tsyringe/helpers/tokens'
import { FAILED_TO_ENQUEUE_FILE_JOB } from '@messages/loggings/jobs/queues/files'
import { USER_DELETION_BY_ADMIN_SUCCESSFUL } from '@messages/loggings/models/user-loggings'
import { buildUserProfileImagePath } from '@services/builders/paths/build-user-profile-image-path'
import { ensureExists } from '@utils/validators/ensure'
import { inject, injectable } from 'tsyringe'
import { AdminCannotDeleteSelfError } from '../errors/user/admin-cannot-delete-self-error'
import { UserNotFoundError } from '../errors/user/user-not-found-error'

@injectable()
export class DeleteUserByAdminUseCase {
  constructor(
    @inject(tsyringeTokens.repositories.users)
    private readonly usersRepository: UsersRepository,

    @inject(tsyringeTokens.infra.database)
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

    // Enfileirando a remoção da antiga foto de perfil do usuário:
    if (deletedUser.profileImage !== DEFAULT_PROFILE_IMAGE_NAME) {
      try {
        fileQueue.add('delete', {
          type: 'delete',
          filePath: buildUserProfileImagePath(deletedUser.profileImage),
        })
      } catch (error) {
        logError({
          error,
          message: FAILED_TO_ENQUEUE_FILE_JOB,
        })
      }
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
