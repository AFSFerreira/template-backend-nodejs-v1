import { orderDirectionsEnumSchema } from '@schemas/utils/enums/order-directions-enum-schema'
import { paginatedSchema } from '@schemas/utils/primitives/paginated-schema'
import z from 'zod'

export const getAllInstitutionsWithUsersQueryRawSchema = z
  .object({
    orderBy: z
      .object({
        usersCountOrder: orderDirectionsEnumSchema.default('desc'),
      })
      .partial(),
  })
  .partial()
  .extend(paginatedSchema.shape)

export const getAllInstitutionsWithUsersQuerySchema = z.preprocess(
  (query: Record<string, unknown>) => ({
    ...query,
    orderBy: {
      ...(query.usersCountOrder ? { usersCountOrder: query.usersCountOrder } : {}),
    },
  }),
  getAllInstitutionsWithUsersQueryRawSchema,
)
