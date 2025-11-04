import { paginatedSchema } from '@schemas/utils/primitives/paginated-schema'
import { z } from 'zod'

export const listOngoingMeetingsQuerySchema = z.object().extend(paginatedSchema.shape)

export type ListOngoingMeetingsQuerySchemaType = z.infer<typeof listOngoingMeetingsQuerySchema>
