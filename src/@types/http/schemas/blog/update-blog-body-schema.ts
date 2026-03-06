import type { updateBlogBodySchema } from '@http/schemas/blog/update-blog-body-schema'
import type { z } from 'zod'

export type UpdateBlogBodyType = typeof updateBlogBodySchema

export type UpdateBlogBodySchemaType = z.infer<UpdateBlogBodyType>
