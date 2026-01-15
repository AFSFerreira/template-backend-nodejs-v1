import type { PaginatedResult } from '@custom-types/custom/pagination-meta-type'
import type { GetAllBlogsQuerySchemaType } from '@custom-types/http/schemas/blog/get-all-blogs-query-schema'
import type { CustomBlogWithSimplifiedDetails } from '@custom-types/repository/prisma/adapter/blog-simplified'

export interface GetAllBlogsUseCaseRequest extends GetAllBlogsQuerySchemaType {}

export interface GetAllBlogsUseCaseResponse extends PaginatedResult<CustomBlogWithSimplifiedDetails[]> {}
