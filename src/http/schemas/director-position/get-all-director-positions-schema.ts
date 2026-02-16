import { orderDirectionsEnumSchema } from '@schemas/utils/enums/order-directions-enum-schema'
import { nonemptyTextSchema } from '@schemas/utils/primitives/nonempty-text-schema'
import { paginatedSchema } from '@schemas/utils/primitives/paginated-schema'
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
