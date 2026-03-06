import type { deleteBlogParamsSchema } from '@http/schemas/blog/delete-blog-params-schema'
import type z from 'zod'

export type DeleteBlogParamsType = typeof deleteBlogParamsSchema

export type DeleteBlogParamsSchemaType = z.infer<DeleteBlogParamsType>
