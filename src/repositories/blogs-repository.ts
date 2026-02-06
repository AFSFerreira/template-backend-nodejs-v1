import type { PaginatedResult } from '@custom-types/custom/pagination-meta-type'
import type { CustomBlogDetailed } from '@custom-types/repository/prisma/adapter/blog-detailed'
import type { CustomBlogWithSimplifiedDetails } from '@custom-types/repository/prisma/adapter/blog-simplified'
import type { CreateBlogQuery } from '@custom-types/repository/prisma/blog/create-blog-query'
import type { ListAllBlogsDetailedQuery } from '@custom-types/repository/prisma/blog/list-all-blogs-detailed-query'
import type { ListAllBlogsQuery } from '@custom-types/repository/prisma/blog/list-all-blogs-query'
import type { UpdateBlogQuery } from '@custom-types/repository/prisma/blog/update-blog-query'
import type { UpdateBlogStatusQuery } from '@custom-types/repository/prisma/blog/update-blog-status-query'
import type { BlogWithDetails } from '@custom-types/validators/blog-with-details'
import type { Blog, Prisma } from '@prisma/generated/client'

export interface BlogsRepository {
  create: (data: CreateBlogQuery) => Promise<Blog>
  incrementAccessesNumber: (id: number) => Promise<void>
  findById: (id: number) => Promise<Blog | null>
  delete: (id: number) => Promise<void>
  update: (query: UpdateBlogQuery) => Promise<Blog>
  updateStatus: (query: UpdateBlogStatusQuery) => Promise<Blog>
  totalCount: (where?: Prisma.BlogWhereInput) => Promise<number>
  findByPublicId: (publicId: string) => Promise<BlogWithDetails | null>
  listAllBlogs: (query?: ListAllBlogsQuery) => Promise<PaginatedResult<CustomBlogWithSimplifiedDetails[]>>
  listAllBlogsDetailed: (query?: ListAllBlogsDetailedQuery) => Promise<PaginatedResult<CustomBlogDetailed[]>>
  listAllUserBlogs: (query?: ListAllBlogsDetailedQuery) => Promise<PaginatedResult<CustomBlogDetailed[]>>
}
