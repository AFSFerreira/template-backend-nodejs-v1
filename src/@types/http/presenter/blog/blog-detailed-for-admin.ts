import type { CustomBlogDetailed } from '@custom-types/repository/prisma/adapter/blog-detailed'
import { editorialStatusEnumSchema } from '@lib/zod/utils/enums/editorial-status-enum-schema'
import { modelPublicIdSchema } from '@lib/zod/utils/generic-components/model-public-id-schema'
import { dateSchema } from '@lib/zod/utils/primitives/date-schema'
import { nonemptyTextArraySchema } from '@lib/zod/utils/primitives/nonempty-text-array-schema'
import { nonemptyTextSchema } from '@lib/zod/utils/primitives/nonempty-text-schema'
import { numberSchema } from '@lib/zod/utils/primitives/number-schema'
import z from 'zod'

export type { BlogWithDetails } from '@custom-types/validators/blog-with-details'

export interface BlogDetailedForAdminPresenterInput extends CustomBlogDetailed {}

const httpBlogDetailedForAdminSchema = z.object({
  id: modelPublicIdSchema,
  title: nonemptyTextSchema,
  bannerImage: nonemptyTextSchema,
  editorialStatus: editorialStatusEnumSchema,
  authorName: nonemptyTextSchema,
  accessCount: numberSchema,
  createdAt: dateSchema,
  updatedAt: dateSchema,
  subcategories: nonemptyTextArraySchema,
})

export type HTTPBlogDetailedForAdmin = z.infer<typeof httpBlogDetailedForAdminSchema>
