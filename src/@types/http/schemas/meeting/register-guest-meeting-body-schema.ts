import type { registerGuestMeetingBodySchema } from '@schemas/meeting/register-guest-meeting-body-schema'
import type z from 'zod'

export type RegisterGuestMeetingBodySchemaType = z.infer<typeof registerGuestMeetingBodySchema>
