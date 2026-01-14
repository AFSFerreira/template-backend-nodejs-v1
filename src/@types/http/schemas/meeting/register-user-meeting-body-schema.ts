import type { registerUserMeetingBodySchema } from '@schemas/meeting/register-user-meeting-body-schema'
import type z from 'zod'

export type RegisterUserMeetingBodySchemaType = z.infer<typeof registerUserMeetingBodySchema>
