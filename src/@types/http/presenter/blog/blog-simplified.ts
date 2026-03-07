import type { CustomBlogWithSimplifiedDetails } from '@custom-types/repository/prisma/adapter/blog-simplified'
import { editorialStatusEnumSchema } from '@lib/zod/utils/enums/editorial-status-enum-schema'
import { modelPublicIdSchema } from '@lib/zod/utils/generic-components/model-public-id-schema'
import { dateSchema } from '@lib/zod/utils/primitives/date-schema'
import { nonemptyTextSchema } from '@lib/zod/utils/primitives/nonempty-text-schema'
import { numberSchema } from '@lib/zod/utils/primitives/number-schema'
import z from 'zod'

export interface BlogSimplifiedPresenterInput extends CustomBlogWithSimplifiedDetails {}

export const httpSimplifiedBlogSchema = z.object({
  id: modelPublicIdSchema,
  title: nonemptyTextSchema,
  bannerImage: nonemptyTextSchema,
  editorialStatus: editorialStatusEnumSchema,
  searchContent: nonemptyTextSchema,
  accessCount: numberSchema,
  createdAt: dateSchema,
  updatedAt: dateSchema,
})

export type HTTPSimplifiedBlog = z.infer<typeof httpSimplifiedBlogSchema>
