import type { updateBlogBodySchema } from '@schemas/blog/update-blog-body-schema'
import type { z } from 'zod'

export type UpdateBlogBodySchemaType = z.infer<typeof updateBlogBodySchema>
