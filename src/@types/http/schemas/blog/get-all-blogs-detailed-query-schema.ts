import type { getAllBlogsDetailedQuerySchema } from '@schemas/blog/get-all-blogs-detailed-query-schema'
import type z from 'zod'

export type GetAllBlogsDetailedQuerySchemaType = z.infer<typeof getAllBlogsDetailedQuerySchema>
