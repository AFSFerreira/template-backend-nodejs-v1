import { orderDirectionsEnumSchema } from '@lib/zod/utils/enums/order-directions-enum-schema'
import { nonemptyTextSchema } from '@lib/zod/utils/primitives/nonempty-text-schema'
import { paginatedSchema } from '@lib/zod/utils/primitives/paginated-schema'
import z from 'zod'

export const getAllDirectorPositionsRawSchema = z
  .object({
    position: nonemptyTextSchema,
    orderBy: z
      .object({
        precedenceOrder: orderDirectionsEnumSchema.default('asc'),
      })
      .partial(),
  })
  .partial()
  .extend(paginatedSchema.shape)

export const getAllDirectorPositionsSchema = z.preprocess(
  (query: Record<string, unknown>) => ({
    ...query,
    orderBy: {
      ...(query.precedenceOrder ? { precedenceOrder: query.precedenceOrder } : {}),
    },
  }),
  getAllDirectorPositionsRawSchema,
)
