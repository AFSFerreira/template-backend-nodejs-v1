import type { findBlogByPublicIdParamsSchema } from '@http/schemas/blog/find-blog-by-public-id-query-schema'
import type z from 'zod'

export type FindBlogByPublicIdParamsType = typeof findBlogByPublicIdParamsSchema

export type FindBlogByPublicIdParamsSchemaType = z.infer<FindBlogByPublicIdParamsType>
