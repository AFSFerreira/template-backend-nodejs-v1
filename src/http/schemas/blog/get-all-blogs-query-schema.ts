import { LONG_LIMITED_CHARACTERS_SIZE } from '@constants/validation-constants'
import { orderDirectionsEnumSchema } from '@schemas/utils/enums/order-directions-enum-schema'
import { modelPublicIdSchema } from '@schemas/utils/generic-components/model-public-id-schema'
import { subcategoriesSchema } from '@schemas/utils/generic-components/sub-categories-schema'
import { nonemptyTextSchema } from '@schemas/utils/primitives/nonempty-text-schema'
import { paginatedSchema } from '@schemas/utils/primitives/paginated-schema'
import z from 'zod'

const getAllBlogsQueryRawSchema = z
  .object({
    searchContent: nonemptyTextSchema.max(LONG_LIMITED_CHARACTERS_SIZE),
    authorId: modelPublicIdSchema,
    subcategories: subcategoriesSchema,
    orderBy: z
      .object({
        createdAtOrder: orderDirectionsEnumSchema.default('desc'),
        accessCountOrder: orderDirectionsEnumSchema,
      })
      .partial(),
  })
  .partial()
  .extend(paginatedSchema.shape)

export const getAllBlogsQuerySchema = z.preprocess(
  (query: Record<string, unknown>) => ({
    ...query,
    orderBy: {
      ...(query.createdAtOrder ? { createdAtOrder: query.createdAtOrder } : {}),
      ...(query.accessCountOrder ? { accessCountOrder: query.accessCountOrder } : {}),
    },
  }),
  getAllBlogsQueryRawSchema,
)
