import type { PaginatedResult } from '@custom-types/custom/pagination-meta-type'
import type { GetAllUserBlogsDetailedQuerySchemaType } from '@custom-types/http/schemas/blog/get-all-user-blogs-detailed-query-schema'
import type { CustomBlogDetailed } from '@custom-types/repository/prisma/adapter/blog-detailed'

export interface GetAllUserBlogsDetailedUseCaseRequest extends GetAllUserBlogsDetailedQuerySchemaType {
  userPublicId: string
}

export interface GetAllUserBlogsDetailedUseCaseResponse extends PaginatedResult<CustomBlogDetailed[]> {}
