import type { getAllPostsQuerySchema } from '@schemas/blog/get-all-posts-query-schema'
import type z from 'zod'

export type GetAllPostsQuerySchemaType = z.infer<typeof getAllPostsQuerySchema>
