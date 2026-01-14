import type { PaginatedResult } from '@custom-types/custom/pagination-meta-type'
import type { GetAllBlogsDetailedQuerySchemaType } from '@custom-types/http/schemas/blog/get-all-blogs-detailed-query-schema'
import type { CustomBlogDetailed } from '@custom-types/repository/prisma/adapter/blog-detailed'

export interface GetAllBlogsDetailedUseCaseRequest extends GetAllBlogsDetailedQuerySchemaType {
  userPublicId: string
}

export interface GetAllBlogsDetailedUseCaseResponse extends PaginatedResult<CustomBlogDetailed[]> {}
