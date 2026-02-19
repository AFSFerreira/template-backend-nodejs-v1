import { orderDirectionsEnumSchema } from '@lib/zod/utils/enums/order-directions-enum-schema'
import { paginatedSchema } from '@lib/zod/utils/primitives/paginated-schema'
import z from 'zod'

export const listMeetingEnrollmentsQueryRawSchema = z
  .object({
    meetingId: z.coerce.number().int().positive(),
    orderBy: z
      .object({
        createdAtOrder: orderDirectionsEnumSchema.default('desc'),
      })
      .partial(),
  })
  .extend(paginatedSchema.shape)

export const listMeetingEnrollmentsQuerySchema = z.preprocess(
  (query: Record<string, unknown>) => ({
    ...query,
    orderBy: {
      ...(query.createdAtOrder ? { createdAtOrder: query.createdAtOrder } : {}),
    },
  }),
  listMeetingEnrollmentsQueryRawSchema,
)
