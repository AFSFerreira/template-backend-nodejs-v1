import type { registerGuestMeetingParamsSchema } from '@http/schemas/meeting/register-guest-meeting-params-schema'
import type z from 'zod'

export type RegisterGuestMeetingParamsType = typeof registerGuestMeetingParamsSchema

export type RegisterGuestMeetingParamsSchemaType = z.infer<RegisterGuestMeetingParamsType>
