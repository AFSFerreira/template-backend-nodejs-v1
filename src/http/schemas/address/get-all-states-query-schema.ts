import { orderDirectionsSchema } from '@schemas/utils/enums/order-directions-schema'
import { paginatedSchema } from '@schemas/utils/primitives/paginated-schema'
import z from 'zod'

const getAllStatesQueryRawSchema = z
  .object({
    orderBy: z
      .object({
        usersCount: orderDirectionsSchema.default('desc'),
      })
      .partial(),
  })
  .partial()
  .extend(paginatedSchema.shape)

export const getAllStatesQuerySchema = z.preprocess(
  (query: any) => ({
    ...query,
    orderBy: {
      ...(query.usersCount ? { usersCount: query.usersCount } : {}),
    },
  }),
  getAllStatesQueryRawSchema,
)

export type GetAllStatesQuerySchemaType = z.infer<typeof getAllStatesQueryRawSchema>
