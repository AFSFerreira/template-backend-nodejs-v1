import type { GetAllBlogsUseCaseRequest, GetAllBlogsUseCaseResponse } from '@custom-types/use-cases/blogs/get-all-blogs'
import type { BlogsRepository } from '@repositories/blogs-repository'

export class GetAllBlogsUseCase {
  constructor(private readonly blogsRepository: BlogsRepository) {}

  async execute(getAllBlogsUseCaseInput: GetAllBlogsUseCaseRequest): Promise<GetAllBlogsUseCaseResponse> {
    const blogsInfo = await this.blogsRepository.listAllBlogs(getAllBlogsUseCaseInput)

    return blogsInfo
  }
}
