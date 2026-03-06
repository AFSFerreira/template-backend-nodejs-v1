import type { getAllUserBlogsDetailedQuerySchema } from '@http/schemas/blog/get-all-user-blogs-detailed-query-schema'
import type z from 'zod'

export type GetAllUserBlogsDetailedQueryType = typeof getAllUserBlogsDetailedQuerySchema

export type GetAllUserBlogsDetailedQuerySchemaType = z.infer<GetAllUserBlogsDetailedQueryType>
