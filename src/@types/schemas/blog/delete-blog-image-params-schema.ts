import type { deleteBlogImageParamsSchema } from '@schemas/blog/delete-blog-image-params-schema'
import type z from 'zod'

export type DeleteBlogImageParamsSchemaType = z.infer<typeof deleteBlogImageParamsSchema>
