import type {
  GetAllBlogsDetailedUseCaseRequest,
  GetAllBlogsDetailedUseCaseResponse,
} from '@custom-types/use-cases/blogs/get-all-blogs-detailed'
import type { DatabaseContext } from '@lib/prisma/helpers/database-context'
import type { BlogsRepository } from '@repositories/blogs-repository'
import type { UsersRepository } from '@repositories/users-repository'
import { tokens } from '@lib/tsyringe/helpers/tokens'
import { UserNotFoundError } from '@use-cases/errors/user/user-not-found-error'
import { ensureExists } from '@utils/validators/ensure'
import { inject, injectable } from 'tsyringe'

@injectable()
export class GetAllBlogsDetailedUseCase {
  constructor(
    @inject(tokens.repositories.blogs)
    private readonly blogsRepository: BlogsRepository,

    @inject(tokens.repositories.users)
    private readonly usersRepository: UsersRepository,

    @inject(tokens.infra.database)
    private readonly dbContext: DatabaseContext,
  ) {}

  async execute(
    getAllBlogsDetailedUseCaseInput: GetAllBlogsDetailedUseCaseRequest,
  ): Promise<GetAllBlogsDetailedUseCaseResponse> {
    const { blogsInfo } = await this.dbContext.runInTransaction(async () => {
      const user = ensureExists({
        value: await this.usersRepository.findByPublicId(getAllBlogsDetailedUseCaseInput.userPublicId),
        error: new UserNotFoundError(),
      })

      const blogsInfo = await this.blogsRepository.listAllBlogsDetailed({
        ...getAllBlogsDetailedUseCaseInput,
        userId: user.id,
      })

      return { blogsInfo }
    })

    return blogsInfo
  }
}
