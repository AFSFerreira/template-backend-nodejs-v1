import type { CustomBlogWithSimplifiedDetails } from '@custom-types/adapter/blog-simplified'
import type { PaginatedResult } from '@custom-types/custom/pagination-meta-type'
import type { GetAllBlogsQuerySchemaType } from '@custom-types/schemas/blog/get-all-blogs-query-schema'

export interface GetAllBlogsUseCaseRequest extends GetAllBlogsQuerySchemaType {}

export interface GetAllBlogsUseCaseResponse extends PaginatedResult<CustomBlogWithSimplifiedDetails[]> {}
