import { proseMirrorSchema } from '@schemas/utils/components/blog/prose-mirror-schema'
import { editorialStatusEnumSchema } from '@schemas/utils/enums/editorial-status-enum-schema'
import { limitedNonemptyTextSchema } from '@schemas/utils/primitives/limited-nonempty-text-schema'
import { nonemptyTextSchema } from '@schemas/utils/primitives/nonempty-text-schema'
import { uppercaseTextArraySchema } from '@schemas/utils/primitives/uppercase-text-array-schema'
import z from 'zod'

export const updateBlogBodySchema = z
  .object({
    title: limitedNonemptyTextSchema,
    bannerImage: nonemptyTextSchema,
    content: proseMirrorSchema,
    editorialStatus: editorialStatusEnumSchema,
    subcategories: uppercaseTextArraySchema.min(1),
  })
  .partial()
