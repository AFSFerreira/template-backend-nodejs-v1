import type { Blog } from '@prisma/generated/client'
import { editorialStatusEnumSchema } from '@lib/zod/utils/enums/editorial-status-enum-schema'
import { modelPublicIdSchema } from '@lib/zod/utils/generic-components/model-public-id-schema'
import { dateSchema } from '@lib/zod/utils/primitives/date-schema'
import { nonemptyTextSchema } from '@lib/zod/utils/primitives/nonempty-text-schema'
import { numberSchema } from '@lib/zod/utils/primitives/number-schema'
import z from 'zod'

export interface BlogDefaultPresenterInput extends Blog {}

export const httpBlogSchema = z.object({
  id: modelPublicIdSchema,
  title: nonemptyTextSchema,
  bannerImage: nonemptyTextSchema,
  editorialStatus: editorialStatusEnumSchema,
  authorName: nonemptyTextSchema,
  accessCount: numberSchema,
  searchContent: nonemptyTextSchema,
  createdAt: dateSchema,
  updatedAt: dateSchema,
})

export type HTTPBlog = z.infer<typeof httpBlogSchema>
