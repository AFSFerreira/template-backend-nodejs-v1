import type { proseMirrorSchema } from '@http/schemas/utils/components/blog/prose-mirror-schema'
import type z from 'zod'

export type ProseMirrorSchemaType = z.infer<typeof proseMirrorSchema>
