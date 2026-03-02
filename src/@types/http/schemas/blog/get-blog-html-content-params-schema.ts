import type { getBlogHtmlContentParamsSchema } from '@http/schemas/blog/get-blog-html-content-params-schema'
import type z from 'zod'

export type GetBlogHtmlContentParamsSchemaType = z.infer<typeof getBlogHtmlContentParamsSchema>
