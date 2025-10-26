import type { CustomBlogWithSimplifiedDetails } from '@custom-types/custom-blog-with-simplified-details-type'
import type { PaginationMetaType } from '@custom-types/pagination-meta-type'
import type { BlogsRepository } from '@repositories/blogs-repository'
import type { GetAllPostsQuerySchemaType } from '@schemas/blog/get-all-posts-query-schema'

interface GetAllBlogsUseCaseRequest extends GetAllPostsQuerySchemaType {}

interface GetAllBlogsUseCaseResponse {
  data: CustomBlogWithSimplifiedDetails[]
  meta: PaginationMetaType
}

export class GetAllBlogsUseCase {
  constructor(private readonly blogsRepository: BlogsRepository) {}

  async execute(getAllBlogsUseCaseInput: GetAllBlogsUseCaseRequest): Promise<GetAllBlogsUseCaseResponse> {
    const blogsInfo = await this.blogsRepository.listAllBlogs(getAllBlogsUseCaseInput)

    return blogsInfo
  }
}
