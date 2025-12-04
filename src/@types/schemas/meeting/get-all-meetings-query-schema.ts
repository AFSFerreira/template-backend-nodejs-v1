import type { getAllMeetingsQuerySchema } from '@schemas/meeting/get-all-meetings-query-schema'
import type z from 'zod'

export type GetAllMeetingsQuerySchemaType = z.infer<typeof getAllMeetingsQuerySchema>
