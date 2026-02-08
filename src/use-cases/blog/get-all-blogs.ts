import type { GetAllBlogsUseCaseRequest, GetAllBlogsUseCaseResponse } from '@custom-types/use-cases/blogs/get-all-blogs'
import type { BlogsRepository } from '@repositories/blogs-repository'
import { tsyringeTokens } from '@lib/tsyringe/helpers/tokens'
import { buildBlogBannerUrl } from '@services/builders/urls/build-blog-banner-url'
import { inject, injectable } from 'tsyringe'

@injectable()
export class GetAllBlogsUseCase {
  constructor(
    @inject(tsyringeTokens.repositories.blogs)
    private readonly blogsRepository: BlogsRepository,
  ) {}

  async execute(getAllBlogsUseCaseInput: GetAllBlogsUseCaseRequest): Promise<GetAllBlogsUseCaseResponse> {
    const blogsInfo = await this.blogsRepository.listAllBlogs(getAllBlogsUseCaseInput)

    return {
      ...blogsInfo,
      data: blogsInfo.data.map((blog) => ({
        ...blog,
        bannerImage: buildBlogBannerUrl(blog.bannerImage),
      })),
    }
  }
}
