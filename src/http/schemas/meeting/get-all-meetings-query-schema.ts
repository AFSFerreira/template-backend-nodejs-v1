import { meetingStatusEnumSchema } from '@schemas/utils/enums/meeting-status-enum-schema'
import { orderDirectionsEnumSchema } from '@schemas/utils/enums/order-directions-enum-schema'
import { limitedNonemptyTextSchema } from '@schemas/utils/primitives/limited-nonempty-text-schema'
import { paginatedSchema } from '@schemas/utils/primitives/paginated-schema'
import z from 'zod'

export const getAllMeetingsQueryRawSchema = z
  .object({
    title: limitedNonemptyTextSchema,
    status: meetingStatusEnumSchema.default('ALL'),
    orderBy: z
      .object({
        createdAtOrder: orderDirectionsEnumSchema.default('desc'),
        lastDateOrder: orderDirectionsEnumSchema.default('desc'),
        titleOrder: orderDirectionsEnumSchema.default('asc'),
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
      ...(query.lastDateOrder ? { lastDateOrder: query.lastDateOrder } : {}),
      ...(query.titleOrder ? { titleOrder: query.titleOrder } : {}),
    },
  }),
  getAllMeetingsQueryRawSchema,
)
