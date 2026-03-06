import type { createDraftCopyBlogParamsSchema } from '@http/schemas/blog/create-draft-copy-blog-params-schema'
import type { z } from 'zod'

export type CreateDraftCopyBlogParamsType = typeof createDraftCopyBlogParamsSchema

export type CreateDraftCopyBlogParamsSchemaType = z.infer<CreateDraftCopyBlogParamsType>
