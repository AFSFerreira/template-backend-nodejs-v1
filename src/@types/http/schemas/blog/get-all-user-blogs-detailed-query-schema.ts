import type { getAllUserBlogsDetailedQuerySchema } from '@schemas/blog/get-all-user-blogs-detailed-query-schema'
import type z from 'zod'

export type GetAllUserBlogsDetailedQuerySchemaType = z.infer<typeof getAllUserBlogsDetailedQuerySchema>
