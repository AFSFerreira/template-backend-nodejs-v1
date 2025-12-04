import { orderDirectionsEnumSchema } from '@schemas/utils/enums/order-directions-enum-schema'
import { paginatedSchema } from '@schemas/utils/primitives/paginated-schema'
import z from 'zod'

const getAllDirectorBoardRawSchema = z
  .object({
    orderBy: z.object({ precedenceOrder: orderDirectionsEnumSchema.default('asc') }).partial(),
  })
  .partial()
  .extend(paginatedSchema.shape)

export const getAllDirectorBoardSchema = z.preprocess(
  (query: any) => ({
    ...query,
    orderBy: {
      ...(query.precedenceOrder ? { precedenceOrder: query.precedenceOrder } : {}),
    },
  }),
  getAllDirectorBoardRawSchema,
)
