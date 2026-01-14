import type { createDraftCopyBlogParamsSchema } from '@schemas/blog/create-draft-copy-blog-params-schema'
import type { z } from 'zod'

export type CreateDraftCopyBlogParamsSchemaType = z.infer<typeof createDraftCopyBlogParamsSchema>
