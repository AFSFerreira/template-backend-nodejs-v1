import { meetingStatusSchema } from '@schemas/utils/enums/meeting-status-schema'
import { orderDirectionsSchema } from '@schemas/utils/enums/order-directions-schema'
import { paginatedSchema } from '@schemas/utils/primitives/paginated-schema'
import z from 'zod'

export const getAllMeetingsQueryRawSchema = z
  .object({
    status: meetingStatusSchema.default('ALL'),
    orderBy: z
      .object({
        createdAtOrder: orderDirectionsSchema.default('desc'),
      })
      .partial(),
  })
  .partial()
  .extend(paginatedSchema.shape)

export const getAllMeetingsQuerySchema = z.preprocess(
  (query: any) => ({
    ...query,
    orderBy: {
      ...(query.createdAtOrder ? { createdAtOrder: query.createdAtOrder } : {}),
    },
  }),
  getAllMeetingsQueryRawSchema,
)

export type GetAllMeetingsQuerySchemaType = z.infer<typeof getAllMeetingsQuerySchema>
