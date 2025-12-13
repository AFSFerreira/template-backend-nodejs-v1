import { meetingStatusEnumSchema } from '@schemas/utils/enums/meeting-status-enum-schema'
import { orderDirectionsEnumSchema } from '@schemas/utils/enums/order-directions-enum-schema'
import { paginatedSchema } from '@schemas/utils/primitives/paginated-schema'
import z from 'zod'

export const getAllMeetingsQueryRawSchema = z
  .object({
    status: meetingStatusEnumSchema.default('ALL'),
    orderBy: z
      .object({
        createdAtOrder: orderDirectionsEnumSchema.default('desc'),
      })
      .partial(),
  })
  .partial()
  .extend(paginatedSchema.shape)

export const getAllMeetingsQuerySchema = z.preprocess(
  (query: Record<string, unknown>) => ({
    ...query,
    orderBy: {
      ...(query.createdAtOrder ? { createdAtOrder: query.createdAtOrder } : {}),
    },
  }),
  getAllMeetingsQueryRawSchema,
)
