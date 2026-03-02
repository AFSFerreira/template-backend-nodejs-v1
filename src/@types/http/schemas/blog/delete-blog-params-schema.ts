import type { deleteBlogParamsSchema } from '@http/schemas/blog/delete-blog-params-schema'
import type z from 'zod'

export type DeleteBlogParamsSchemaType = z.infer<typeof deleteBlogParamsSchema>
