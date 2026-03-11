import type {
  GetAllBlogsDetailedUseCaseRequest,
  GetAllBlogsDetailedUseCaseResponse,
} from '@custom-types/use-cases/blogs/get-all-blogs-detailed'
import type { BlogsRepository } from '@repositories/blogs-repository'
import type { UsersRepository } from '@repositories/users-repository'
import { tsyringeTokens } from '@lib/tsyringe/helpers/tokens'
import { UserNotFoundError } from '@use-cases/errors/user/user-not-found-error'
import { ensureExists } from '@utils/validators/ensure'
import { inject, singleton } from 'tsyringe'

@singleton()
export class GetAllBlogsDetailedUseCase {
  constructor(
    @inject(tsyringeTokens.repositories.blogs)
    private readonly blogsRepository: BlogsRepository,

    @inject(tsyringeTokens.repositories.users)
    private readonly usersRepository: UsersRepository,
  ) {}

  async execute(
    getAllBlogsDetailedUseCaseInput: GetAllBlogsDetailedUseCaseRequest,
  ): Promise<GetAllBlogsDetailedUseCaseResponse> {
    const user = ensureExists({
      value: await this.usersRepository.findByPublicId(getAllBlogsDetailedUseCaseInput.userPublicId),
      error: new UserNotFoundError(),
    })

    const blogsInfo = await this.blogsRepository.listAllBlogsDetailed({
      ...getAllBlogsDetailedUseCaseInput,
      userId: user.id,
    })

    return blogsInfo
  }
}
