import type { CustomBlogDetailed } from '@custom-types/adapter/blog-detailed'
import type { PaginatedResult } from '@custom-types/custom/pagination-meta-type'
import type { GetAllBlogsDetailedQuerySchemaType } from '@custom-types/schemas/blog/get-all-blogs-detailed-query-schema'

export interface GetAllUserBlogsDetailedUseCaseRequest extends GetAllBlogsDetailedQuerySchemaType {
  userPublicId: string
}

export interface GetAllUserBlogsDetailedUseCaseResponse extends PaginatedResult<CustomBlogDetailed[]> {}
