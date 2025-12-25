import type { GetAllBlogsDetailedQuerySchemaType } from '@custom-types/schemas/blog/get-all-blogs-detailed-query-schema'

export interface ListAllBlogsDetailedQuery extends GetAllBlogsDetailedQuerySchemaType {
  userId: number
}
