import type { CustomBlogWithSimplifiedDetails } from '@custom-types/adapter/blog-simplified'
import type { PaginatedResult } from '@custom-types/custom/pagination-meta-type'
import type { CreateBlogQuery } from '@custom-types/repository/blog/create-blog-query'
import type { ListAllBlogsQuery } from '@custom-types/repository/blog/list-all-blogs-query'
import type { BlogWithDetails } from '@custom-types/validator/blog-with-details'
import type { Blog } from '@prisma/client'

export interface BlogsRepository {
  create: (data: CreateBlogQuery) => Promise<Blog>
  findById: (id: number) => Promise<Blog | null>
  findByPublicId: (publicId: string) => Promise<BlogWithDetails | null>
  listAllBlogs: (query?: ListAllBlogsQuery) => Promise<PaginatedResult<CustomBlogWithSimplifiedDetails[]>>
  incrementAccessesNumber: (id: number) => Promise<void>
}
