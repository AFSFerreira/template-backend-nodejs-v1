import type { getRestrictBlogHtmlContentParamsSchema } from '@http/schemas/blog/get-restrict-blog-html-content-params-schema'
import type z from 'zod'

export type GetRestrictBlogHtmlContentParamsType = typeof getRestrictBlogHtmlContentParamsSchema

export type GetRestrictBlogHtmlContentParamsSchemaType = z.infer<GetRestrictBlogHtmlContentParamsType>
