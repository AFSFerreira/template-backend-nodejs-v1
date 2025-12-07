import type {
  DeleteUserUseCaseRequest,
  DeleteUserUseCaseResponse,
} from '@custom-types/use-cases/user/delete-own-account'
import { logger } from '@lib/logger'
import type { DatabaseContext } from '@lib/prisma/helpers/database-context'
import { tokens } from '@lib/tsyringe/helpers/tokens'
import { USER_DELETION_SUCCESSFUL } from '@messages/loggings'
import type { UsersRepository } from '@repositories/users-repository'
import { ensureExists } from '@utils/guards/ensure'
import { inject, injectable } from 'tsyringe'
import { UserNotFoundError } from '../errors/user/user-not-found-error'

@injectable()
export class DeleteUserUseCase {
  constructor(
    @inject(tokens.repositories.users)
    private readonly usersRepository: UsersRepository,

    @inject(tokens.infra.database)
    private readonly dbContext: DatabaseContext,
  ) {}

  async execute({ publicId }: DeleteUserUseCaseRequest): Promise<DeleteUserUseCaseResponse> {
    const deletedUser = await this.dbContext.runInTransaction(async () => {
      const user = ensureExists({
        value: await this.usersRepository.findByPublicId(publicId),
        error: new UserNotFoundError(),
      })

      await this.usersRepository.delete(user.id)

      return user
    })

    logger.info(
      {
        publicId: deletedUser.publicId,
        email: deletedUser.email,
      },
      USER_DELETION_SUCCESSFUL,
    )

    return {}
  }
}
