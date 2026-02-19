import { orderDirectionsEnumSchema } from '@lib/zod/utils/enums/order-directions-enum-schema'
import { paginatedSchema } from '@lib/zod/utils/primitives/paginated-schema'
import z from 'zod'

const getAllDirectorBoardRawSchema = z
  .object({
    orderBy: z
      .object({
        precedenceOrder: orderDirectionsEnumSchema.default('asc'),
        fullNameOrder: orderDirectionsEnumSchema.default('asc'),
      })
      .partial(),
  })
  .partial()
  .extend(paginatedSchema.shape)

export const getAllDirectorBoardSchema = z.preprocess(
  (query: Record<string, unknown>) => ({
    ...query,
    orderBy: {
      ...(query.precedenceOrder ? { precedenceOrder: query.precedenceOrder } : {}),
      ...(query.fullNameOrder ? { fullNameOrder: query.fullNameOrder } : {}),
    },
  }),
  getAllDirectorBoardRawSchema,
)
