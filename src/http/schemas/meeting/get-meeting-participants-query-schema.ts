import { orderDirectionsEnumSchema } from '@lib/zod/utils/enums/order-directions-enum-schema'
import { paginatedSchema } from '@lib/zod/utils/primitives/paginated-schema'
import z from 'zod'

export const getMeetingParticipantsQueryRawSchema = z
  .object({
    orderBy: z
      .object({
        createdAtOrder: orderDirectionsEnumSchema.default('desc'),
      })
      .partial(),
  })
  .partial()
  .extend(paginatedSchema.shape)

export const getMeetingParticipantsQuerySchema = z.preprocess(
  (query: Record<string, unknown>) => ({
    ...query,
    orderBy: {
      ...(query.createdAtOrder ? { createdAtOrder: query.createdAtOrder } : {}),
    },
  }),
  getMeetingParticipantsQueryRawSchema,
)
