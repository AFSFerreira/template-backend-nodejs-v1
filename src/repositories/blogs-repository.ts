import type { CustomBlogWithSimplifiedDetails } from '@custom-types/adapter/output/custom-blog-with-simplified-details-type'
import type { PaginatedResult } from '@custom-types/custom/pagination-meta-type'
import type { ListAllBlogsQuery } from '@custom-types/repositories/blog/list-all-blogs-query'
import type { BlogWithDetails } from '@custom-types/validator/blog-with-details'
import type { Blog, Prisma } from '@prisma/client'

export interface BlogsRepository {
  create: (data: Prisma.BlogUncheckedCreateInput) => Promise<Blog>
  findById: (id: number) => Promise<Blog | null>
  findByPublicId: (publicId: string) => Promise<BlogWithDetails | null>
  listAllBlogs: (query?: ListAllBlogsQuery) => Promise<PaginatedResult<CustomBlogWithSimplifiedDetails[]>>
  incrementAccessesNumber: (id: number) => Promise<void>
}
