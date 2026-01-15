import type { registerGuestMeetingParamsSchema } from '@schemas/meeting/register-guest-meeting-params-schema'
import type z from 'zod'

export type RegisterGuestMeetingParamsSchemaType = z.infer<typeof registerGuestMeetingParamsSchema>
