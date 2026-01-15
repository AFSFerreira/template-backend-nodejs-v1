import type { GetAllBlogsDetailedQuerySchemaType } from '@custom-types/http/schemas/blog/get-all-blogs-detailed-query-schema'

export interface IBuildGetAllBlogsDetailedQuerySchemaType extends GetAllBlogsDetailedQuerySchemaType {
  userId: number
}
