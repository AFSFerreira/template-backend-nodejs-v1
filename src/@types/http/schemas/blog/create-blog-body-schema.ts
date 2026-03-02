import type { createBlogBodySchema } from '@http/schemas/blog/create-blog-body-schema'
import type z from 'zod'

export type CreateBlogBodySchemaType = z.infer<typeof createBlogBodySchema>
