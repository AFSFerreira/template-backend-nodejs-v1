import type { getMeetingParticipantsQuerySchema } from '@http/schemas/meeting/get-meeting-participants-query-schema'
import type z from 'zod'

export type GetMeetingParticipantsQueryType = typeof getMeetingParticipantsQuerySchema

export type GetMeetingParticipantsQuerySchemaType = z.infer<GetMeetingParticipantsQueryType>
