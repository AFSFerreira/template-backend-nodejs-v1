import type { getMeetingParticipantsParamsSchema } from '@schemas/meeting/get-meeting-participants-params-schema'
import type { z } from 'zod'

export type GetMeetingParticipantsParamsSchemaType = z.infer<typeof getMeetingParticipantsParamsSchema>
