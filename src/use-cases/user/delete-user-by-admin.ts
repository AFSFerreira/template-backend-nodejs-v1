import type {
  DeleteUserByAdminUseCaseRequest,
  DeleteUserByAdminUseCaseResponse,
} from '@custom-types/use-cases/user/delete-user-by-admin'
import { logger } from '@lib/logger'
import { USER_DELETION_BY_ADMIN_SUCCESSFUL } from '@messages/loggings'
import type { UsersRepository } from '@repositories/users-repository'
import { ensureExists } from '@utils/guards/ensure'

import { UserNotFoundError } from '../errors/user/user-not-found-error'

export class DeleteUserByAdminUseCase {
  constructor(private readonly usersRepository: UsersRepository) {}

  async execute({
    adminPublicId,
    targetUserPublicId,
  }: DeleteUserByAdminUseCaseRequest): Promise<DeleteUserByAdminUseCaseResponse> {
    const targetUser = ensureExists({
      value: await this.usersRepository.findByPublicId(targetUserPublicId),
      error: new UserNotFoundError(),
    })

    await this.usersRepository.delete(targetUser.id)

    logger.info(
      {
        adminPublicId,
        targetUserPublicId,
        targetUserEmail: targetUser.email,
      },
      USER_DELETION_BY_ADMIN_SUCCESSFUL,
    )

    return {}
  }
}
