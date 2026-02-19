import { orderDirectionsEnumSchema } from '@lib/zod/utils/enums/order-directions-enum-schema'
import { paginatedSchema } from '@lib/zod/utils/primitives/paginated-schema'
import { upperCaseTextSchema } from '@lib/zod/utils/primitives/uppercase-text-schema'
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
