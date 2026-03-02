import type { registerGuestMeetingBodySchema } from '@http/schemas/meeting/register-guest-meeting-body-schema'
import type z from 'zod'

export type RegisterGuestMeetingBodySchemaType = z.infer<typeof registerGuestMeetingBodySchema>
