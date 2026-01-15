import type { findBlogByPublicIdParamsSchema } from '@schemas/blog/find-blog-by-public-id-query-schema'
import type z from 'zod'

export type FindBlogByPublicIdParamsSchemaType = z.infer<typeof findBlogByPublicIdParamsSchema>
