import type { getMeetingParticipantsQuerySchema } from '@schemas/meeting/get-meeting-participants-query-schema'
import type z from 'zod'

export type GetMeetingParticipantsQuerySchemaType = z.infer<typeof getMeetingParticipantsQuerySchema>
