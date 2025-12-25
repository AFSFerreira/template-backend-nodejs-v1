import { proseMirrorSchema } from '@schemas/utils/components/blog/prose-mirror-schema'
import { limitedNonemptyTextSchema } from '@schemas/utils/primitives/limited-nonempty-text-schema'
import { nonemptyTextSchema } from '@schemas/utils/primitives/nonempty-text-schema'
import { uppercaseTextArraySchema } from '@schemas/utils/primitives/uppercase-text-array-schema'
import z from 'zod'

export const createBlogBodySchema = z.object({
  title: limitedNonemptyTextSchema,
  bannerImage: nonemptyTextSchema,
  content: proseMirrorSchema,
  subcategories: uppercaseTextArraySchema.min(1),
})
