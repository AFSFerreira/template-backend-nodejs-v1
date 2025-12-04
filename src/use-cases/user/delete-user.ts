import type {
  DeleteUserUseCaseRequest,
  DeleteUserUseCaseResponse,
} from '@custom-types/use-cases/user/delete-own-account'
import { logger } from '@lib/logger'
import { USER_DELETION_SUCCESSFUL } from '@messages/loggings'
import type { UsersRepository } from '@repositories/users-repository'
import { ensureExists } from '@utils/guards/ensure'
import { UserNotFoundError } from '../errors/user/user-not-found-error'

export class DeleteUserUseCase {
  constructor(private readonly usersRepository: UsersRepository) {}

  async execute({ publicId }: DeleteUserUseCaseRequest): Promise<DeleteUserUseCaseResponse> {
    const user = ensureExists({
      value: await this.usersRepository.findByPublicId(publicId),
      error: new UserNotFoundError(),
    })

    await this.usersRepository.delete(user.id)

    logger.info(
      {
        publicId: user.publicId,
        email: user.email,
      },
      USER_DELETION_SUCCESSFUL,
    )

    return {}
  }
}
