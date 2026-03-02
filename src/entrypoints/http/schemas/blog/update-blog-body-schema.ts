import { proseMirrorSchema } from '@lib/zod/utils/components/blog/prose-mirror-schema'
import { editorialStatusEnumSchema } from '@lib/zod/utils/enums/editorial-status-enum-schema'
import { limitedNonemptyTextSchema } from '@lib/zod/utils/primitives/limited-nonempty-text-schema'
import { nonemptyTextSchema } from '@lib/zod/utils/primitives/nonempty-text-schema'
import { uppercaseTextArraySchema } from '@lib/zod/utils/primitives/uppercase-text-array-schema'
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
