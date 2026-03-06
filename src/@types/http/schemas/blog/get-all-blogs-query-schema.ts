import type { getAllBlogsQuerySchema } from '@http/schemas/blog/get-all-blogs-query-schema'
import type z from 'zod'

export type GetAllBlogsQueryType = typeof getAllBlogsQuerySchema

export type GetAllBlogsQuerySchemaType = z.infer<GetAllBlogsQueryType>
