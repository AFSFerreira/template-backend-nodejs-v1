import { orderDirectionsEnumSchema } from '@lib/zod/utils/enums/order-directions-enum-schema'
import { paginatedSchema } from '@lib/zod/utils/primitives/paginated-schema'
import { upperCaseTextSchema } from '@lib/zod/utils/primitives/uppercase-text-schema'
import z from 'zod'

export const getAllUsersSimplifiedQueryRawSchema = z
  .object({
    fullName: upperCaseTextSchema,
    institutionName: upperCaseTextSchema,
    state: upperCaseTextSchema,
    orderBy: z
      .object({
        fullNameOrder: orderDirectionsEnumSchema,
      })
      .partial(),
  })
  .partial()
  .extend(paginatedSchema.shape)

export const getAllUsersSimplifiedQuerySchema = z.preprocess(
  (query: Record<string, unknown>) => ({
    ...query,
    orderBy: {
      ...(query.fullNameOrder ? { fullNameOrder: query.fullNameOrder } : {}),
    },
  }),
  getAllUsersSimplifiedQueryRawSchema,
)
