import type { BlogWithDetails } from '@custom-types/blog-with-details'
import type { CustomBlogWithSimplifiedDetails } from '@custom-types/custom-blog-with-simplified-details-type'
import type { PaginatedResult } from '@custom-types/pagination-meta-type'
import type { Blog, Prisma } from '@prisma/client'
import type { GetAllPostsQuerySchemaType } from '@schemas/blog/get-all-posts-query-schema'

export interface ListAllBlogsQuery extends GetAllPostsQuerySchemaType {}

export interface BlogsRepository {
  create: (data: Prisma.BlogUncheckedCreateInput) => Promise<Blog>
  findById: (id: number) => Promise<Blog | null>
  findByPublicId: (publicId: string) => Promise<BlogWithDetails | null>
  listAllBlogs: (query?: ListAllBlogsQuery) => Promise<PaginatedResult<CustomBlogWithSimplifiedDetails[]>>
  incrementAccessesNumber: (id: number) => Promise<void>
}
