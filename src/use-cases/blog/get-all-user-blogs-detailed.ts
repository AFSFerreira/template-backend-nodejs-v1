import type {
  GetAllUserBlogsDetailedUseCaseRequest,
  GetAllUserBlogsDetailedUseCaseResponse,
} from '@custom-types/use-cases/blogs/get-all-user-blogs-detailed'
import type { BlogsRepository } from '@repositories/blogs-repository'
import type { UsersRepository } from '@repositories/users-repository'
import { tsyringeTokens } from '@lib/tsyringe/helpers/tokens'
import { buildBlogBannerUrl } from '@services/builders/urls/build-blog-banner-url'
import { UserNotFoundError } from '@use-cases/errors/user/user-not-found-error'
import { ensureExists } from '@utils/validators/ensure'
import { inject, injectable } from 'tsyringe'

@injectable()
export class GetAllUserBlogsDetailedUseCase {
  constructor(
    @inject(tsyringeTokens.repositories.blogs)
    private readonly blogsRepository: BlogsRepository,

    @inject(tsyringeTokens.repositories.users)
    private readonly usersRepository: UsersRepository,
  ) {}

  async execute(
    getAllUserBlogsDetailedUseCaseInput: GetAllUserBlogsDetailedUseCaseRequest,
  ): Promise<GetAllUserBlogsDetailedUseCaseResponse> {
    const user = ensureExists({
      value: await this.usersRepository.findByPublicId(getAllUserBlogsDetailedUseCaseInput.userPublicId),
      error: new UserNotFoundError(),
    })

    const blogsInfo = await this.blogsRepository.listAllUserBlogs({
      ...getAllUserBlogsDetailedUseCaseInput,
      userId: user.id,
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
