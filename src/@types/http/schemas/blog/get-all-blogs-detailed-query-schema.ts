import type { getAllBlogsDetailedQuerySchema } from '@http/schemas/blog/get-all-blogs-detailed-query-schema'
import type z from 'zod'

export type GetAllBlogsDetailedQueryType = typeof getAllBlogsDetailedQuerySchema

export type GetAllBlogsDetailedQuerySchemaType = z.infer<typeof getAllBlogsDetailedQuerySchema>
