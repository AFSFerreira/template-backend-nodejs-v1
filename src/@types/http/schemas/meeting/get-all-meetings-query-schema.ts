import type { getAllMeetingsQuerySchema } from '@http/schemas/meeting/get-all-meetings-query-schema'
import type z from 'zod'

export type GetAllMeetingsQueryType = typeof getAllMeetingsQuerySchema

export type GetAllMeetingsQuerySchemaType = z.infer<GetAllMeetingsQueryType>
