import type { BlogWithSimplifiedDetails } from '@custom-types/blog-with-simplified-details-type'
import type { PaginationMetaType } from '@custom-types/pagination-meta-type'
import type { BlogsRepository } from '@repositories/blogs-repository'
import type { GetAllPostsQuerySchemaType } from '@schemas/blogs/get-all-posts-query-schema'

interface GetAllBlogsUseCaseRequest extends GetAllPostsQuerySchemaType {}

interface GetAllBlogsUseCaseResponse {
  data: BlogWithSimplifiedDetails[]
  meta: PaginationMetaType
}

export class GetAllBlogsUseCase {
  constructor(private readonly blogsRepository: BlogsRepository) {}

  async execute(getAllBlogsUseCaseInput: GetAllBlogsUseCaseRequest): Promise<GetAllBlogsUseCaseResponse> {
    const blogsInfo = await this.blogsRepository.listAllBlogs(getAllBlogsUseCaseInput)

    return blogsInfo
  }
}
