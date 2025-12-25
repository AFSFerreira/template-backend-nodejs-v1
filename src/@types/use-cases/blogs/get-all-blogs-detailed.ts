import type { CustomBlogDetailed } from '@custom-types/adapter/blog-detailed'
import type { PaginatedResult } from '@custom-types/custom/pagination-meta-type'
import type { GetAllBlogsDetailedQuerySchemaType } from '@custom-types/schemas/blog/get-all-blogs-detailed-query-schema'

export interface GetAllBlogsDetailedUseCaseRequest extends GetAllBlogsDetailedQuerySchemaType {
  userPublicId: string
}

export interface GetAllBlogsDetailedUseCaseResponse extends PaginatedResult<CustomBlogDetailed[]> {}
