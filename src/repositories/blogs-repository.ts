import type { BlogWithSimplifiedDetails } from '@custom-types/blog-with-simplified-details-type'
import type { PaginatedResult } from '@custom-types/pagination-meta-type'
import type { Blog, Prisma } from '@prisma/client'
import type { GetAllPostsQuerySchemaType } from '@schemas/blogs/get-all-posts-query-schema'

export interface ListAllBlogsQuery extends GetAllPostsQuerySchemaType {}

export interface BlogsRepository {
  create: (data: Prisma.BlogUncheckedCreateInput) => Promise<Blog>
  findById: (id: number) => Promise<Blog | null>
  findByPublicId: (publicId: string) => Promise<Blog | null>
  listAllBlogs: (query?: ListAllBlogsQuery) => Promise<PaginatedResult<BlogWithSimplifiedDetails[]>>
}
