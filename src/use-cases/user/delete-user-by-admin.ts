import type {
  DeleteUserByAdminUseCaseRequest,
  DeleteUserByAdminUseCaseResponse,
} from '@custom-types/use-cases/user/delete-user-by-admin'
import type { UsersRepository } from '@repositories/users-repository'
import { DEFAULT_PROFILE_IMAGE_NAME } from '@constants/static-file-constants'
import { deleteFileEnqueued } from '@jobs/queues/facades/file-queue-facade'
import { logger } from '@lib/logger'
import { tsyringeTokens } from '@lib/tsyringe/helpers/tokens'
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
  ) {}

  async execute({
    adminPublicId,
    targetUserPublicId,
  }: DeleteUserByAdminUseCaseRequest): Promise<DeleteUserByAdminUseCaseResponse> {
    const deletedUser = ensureExists({
      value: await this.usersRepository.findByPublicId(targetUserPublicId),
      error: new UserNotFoundError(),
    })

    if (adminPublicId === targetUserPublicId) {
      throw new AdminCannotDeleteSelfError()
    }

    await this.usersRepository.delete(deletedUser.id)

    // Enfileirando a remoção da antiga foto de perfil do usuário:
    if (deletedUser.profileImage !== DEFAULT_PROFILE_IMAGE_NAME) {
      await deleteFileEnqueued({
        filePath: buildUserProfileImagePath(deletedUser.profileImage),
      })
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
