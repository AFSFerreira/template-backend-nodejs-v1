import type { CustomBlogWithSimplifiedDetails } from '@custom-types/adapter/output/custom-blog-with-simplified-details-type'
import type { PaginatedResult } from '@custom-types/custom/pagination-meta-type'
import type { GetAllPostsQuerySchemaType } from '@custom-types/schemas/blog/get-all-posts-query-schema'

export interface GetAllBlogsUseCaseRequest extends GetAllPostsQuerySchemaType {}

export interface GetAllBlogsUseCaseResponse extends PaginatedResult<CustomBlogWithSimplifiedDetails[]> {}
