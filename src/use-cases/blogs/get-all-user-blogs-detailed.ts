import type {
  GetAllUserBlogsDetailedUseCaseRequest,
  GetAllUserBlogsDetailedUseCaseResponse,
} from '@custom-types/use-cases/blogs/get-all-user-blogs-detailed'
import type { DatabaseContext } from '@lib/prisma/helpers/database-context'
import type { BlogsRepository } from '@repositories/blogs-repository'
import type { UsersRepository } from '@repositories/users-repository'
import { tokens } from '@lib/tsyringe/helpers/tokens'
import { buildBlogBannerUrl } from '@services/builders/urls/build-blog-banner-url'
import { UserNotFoundError } from '@use-cases/errors/user/user-not-found-error'
import { ensureExists } from '@utils/validators/ensure'
import { inject, injectable } from 'tsyringe'

@injectable()
export class GetAllUserBlogsDetailedUseCase {
  constructor(
    @inject(tokens.repositories.blogs)
    private readonly blogsRepository: BlogsRepository,

    @inject(tokens.repositories.users)
    private readonly usersRepository: UsersRepository,

    @inject(tokens.infra.database)
    private readonly dbContext: DatabaseContext,
  ) {}

  async execute(
    getAllUserBlogsDetailedUseCaseInput: GetAllUserBlogsDetailedUseCaseRequest,
  ): Promise<GetAllUserBlogsDetailedUseCaseResponse> {
    const { blogsInfo } = await this.dbContext.runInTransaction(async () => {
      const user = ensureExists({
        value: await this.usersRepository.findByPublicId(getAllUserBlogsDetailedUseCaseInput.userPublicId),
        error: new UserNotFoundError(),
      })

      const blogsInfo = await this.blogsRepository.listAllUserBlogs({
        ...getAllUserBlogsDetailedUseCaseInput,
        userId: user.id,
      })

      return { blogsInfo }
    })

    return {
      ...blogsInfo,
      data: blogsInfo.data.map((blog) => ({
        ...blog,
        bannerImage: buildBlogBannerUrl(blog.bannerImage),
      })),
    }
  }
}
