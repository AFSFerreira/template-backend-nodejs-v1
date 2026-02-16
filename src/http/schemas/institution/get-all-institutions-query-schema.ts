import { orderDirectionsEnumSchema } from '@schemas/utils/enums/order-directions-enum-schema'
import { paginatedSchema } from '@schemas/utils/primitives/paginated-schema'
import { upperCaseTextSchema } from '@schemas/utils/primitives/uppercase-text-schema'
import z from 'zod'

export const getAllInstitutionsQueryRawSchema = z
  .object({
    name: upperCaseTextSchema.min(5),
    orderBy: z
      .object({
        nameOrder: orderDirectionsEnumSchema.default('asc'),
      })
      .partial(),
  })
  .partial()
  .extend(paginatedSchema.shape)

export const getAllInstitutionsQuerySchema = z.preprocess(
  (query: Record<string, unknown>) => ({
    ...query,
    orderBy: {
      ...(query.nameOrder ? { nameOrder: query.nameOrder } : {}),
    },
  }),
  getAllInstitutionsQueryRawSchema,
)
