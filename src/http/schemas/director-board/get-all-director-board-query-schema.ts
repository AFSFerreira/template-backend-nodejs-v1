import { orderDirectionsSchema } from '@schemas/utils/enums/order-directions-schema'
import { paginatedSchema } from '@schemas/utils/primitives/paginated-schema'
import z from 'zod'

export const getAllDirectorBoardRawSchema = z
  .object({
    orderBy: z.object({ precedenceOrder: orderDirectionsSchema.default('asc') }).partial(),
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

export type getAllDirectorBoardSchemaType = z.infer<typeof getAllDirectorBoardSchema>
