import type { deleteBlogParamsSchema } from '@schemas/blog/delete-blog-params-schema'
import type z from 'zod'

export type DeleteBlogParamsSchemaType = z.infer<typeof deleteBlogParamsSchema>
