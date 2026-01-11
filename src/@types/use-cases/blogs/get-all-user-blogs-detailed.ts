import type { CustomBlogDetailed } from '@custom-types/adapter/blog-detailed'
import type { PaginatedResult } from '@custom-types/custom/pagination-meta-type'
import type { GetAllUserBlogsDetailedQuerySchemaType } from '@custom-types/schemas/blog/get-all-user-blogs-detailed-query-schema'

export interface GetAllUserBlogsDetailedUseCaseRequest extends GetAllUserBlogsDetailedQuerySchemaType {
  userPublicId: string
}

export interface GetAllUserBlogsDetailedUseCaseResponse extends PaginatedResult<CustomBlogDetailed[]> {}
