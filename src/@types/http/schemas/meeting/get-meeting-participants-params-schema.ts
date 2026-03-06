import type { getMeetingParticipantsParamsSchema } from '@http/schemas/meeting/get-meeting-participants-params-schema'
import type { z } from 'zod'

export type GetMeetingParticipantsParamsType = typeof getMeetingParticipantsParamsSchema

export type GetMeetingParticipantsParamsSchemaType = z.infer<GetMeetingParticipantsParamsType>
