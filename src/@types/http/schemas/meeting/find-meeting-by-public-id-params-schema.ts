import type { findMeetingByPublicIdParamsSchema } from '@http/schemas/meeting/find-meeting-by-public-id-params-schema'
import type z from 'zod'

export type FindMeetingByPublicIdParamsSchemaType = z.infer<typeof findMeetingByPublicIdParamsSchema>
