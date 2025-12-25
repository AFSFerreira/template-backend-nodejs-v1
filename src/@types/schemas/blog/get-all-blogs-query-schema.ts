import type { getAllBlogsQuerySchema } from '@schemas/blog/get-all-blogs-query-schema'
import type z from 'zod'

export type GetAllBlogsQuerySchemaType = z.infer<typeof getAllBlogsQuerySchema>
