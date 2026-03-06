import { limitedNonemptyTextSchema } from '@lib/zod/utils/primitives/limited-nonempty-text-schema'
import { nonemptyTextSchema } from '@lib/zod/utils/primitives/nonempty-text-schema'
import { uppercaseTextArraySchema } from '@lib/zod/utils/primitives/uppercase-text-array-schema'
import z from 'zod'
import { proseMirrorSchema } from '../utils/components/blog/prose-mirror-schema'

export const createBlogBodySchema = z.object({
  title: limitedNonemptyTextSchema,
  bannerImage: nonemptyTextSchema,
  content: proseMirrorSchema,
  subcategories: uppercaseTextArraySchema.min(1),
})
