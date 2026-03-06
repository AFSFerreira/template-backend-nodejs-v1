import type { registerGuestMeetingBodySchema } from '@http/schemas/meeting/register-guest-meeting-body-schema'
import type z from 'zod'

export type RegisterGuestMeetingBodyType = typeof registerGuestMeetingBodySchema

export type RegisterGuestMeetingBodySchemaType = z.infer<RegisterGuestMeetingBodyType>
