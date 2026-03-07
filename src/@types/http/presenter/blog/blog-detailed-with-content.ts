import type { BlogWithDetails } from '@custom-types/validators/blog-with-details'
import { proseMirrorSchema } from '@http/schemas/utils/components/blog/prose-mirror-schema'
import { editorialStatusEnumSchema } from '@lib/zod/utils/enums/editorial-status-enum-schema'
import { modelPublicIdSchema } from '@lib/zod/utils/generic-components/model-public-id-schema'
import { dateSchema } from '@lib/zod/utils/primitives/date-schema'
import { nonemptyTextArraySchema } from '@lib/zod/utils/primitives/nonempty-text-array-schema'
import { nonemptyTextSchema } from '@lib/zod/utils/primitives/nonempty-text-schema'
import { numberSchema } from '@lib/zod/utils/primitives/number-schema'
import z from 'zod'

export interface BlogDetailedWithContentPresenterInput extends BlogWithDetails {}

const httpBlogDetailedWithContentSchema = z.object({
  id: modelPublicIdSchema,
  title: nonemptyTextSchema,
  editorialStatus: editorialStatusEnumSchema,
  bannerImage: nonemptyTextSchema,
  authorName: nonemptyTextSchema,
  accessCount: numberSchema,
  createdAt: dateSchema,
  updatedAt: dateSchema,
  subcategories: nonemptyTextArraySchema,
  content: proseMirrorSchema,
})

export type HTTPBlogDetailedWithContent = z.infer<typeof httpBlogDetailedWithContentSchema>
