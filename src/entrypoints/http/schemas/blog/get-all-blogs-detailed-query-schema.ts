import { LONG_LIMITED_CHARACTERS_SIZE } from '@constants/validation-constants'
import { editorialStatusEnumSchema } from '@lib/zod/utils/enums/editorial-status-enum-schema'
import { orderDirectionsEnumSchema } from '@lib/zod/utils/enums/order-directions-enum-schema'
import { modelPublicIdSchema } from '@lib/zod/utils/generic-components/model-public-id-schema'
import { subcategoriesSchema } from '@lib/zod/utils/generic-components/sub-categories-schema'
import { nonemptyTextSchema } from '@lib/zod/utils/primitives/nonempty-text-schema'
import { paginatedSchema } from '@lib/zod/utils/primitives/paginated-schema'
import z from 'zod'

const getAllBlogsDetailedQueryRawSchema = z
  .object({
    searchContent: nonemptyTextSchema.max(LONG_LIMITED_CHARACTERS_SIZE),
    authorId: modelPublicIdSchema,
    subcategories: subcategoriesSchema,
    editorialStatus: editorialStatusEnumSchema,
    orderBy: z
      .object({
        createdAtOrder: orderDirectionsEnumSchema.default('desc'),
        accessCountOrder: orderDirectionsEnumSchema,
      })
      .partial(),
  })
  .partial()
  .extend(paginatedSchema.shape)

export const getAllBlogsDetailedQuerySchema = z.preprocess(
  (query: Record<string, unknown>) => ({
    ...query,
    orderBy: {
      ...(query.createdAtOrder ? { createdAtOrder: query.createdAtOrder } : {}),
      ...(query.accessCountOrder ? { accessCountOrder: query.accessCountOrder } : {}),
    },
  }),
  getAllBlogsDetailedQueryRawSchema,
)
