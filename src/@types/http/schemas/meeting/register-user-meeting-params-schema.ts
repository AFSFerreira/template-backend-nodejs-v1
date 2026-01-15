import type { registerUserMeetingParamsSchema } from '@schemas/meeting/register-user-meeting-params-schema'
import type z from 'zod'

export type RegisterUserMeetingParamsSchemaType = z.infer<typeof registerUserMeetingParamsSchema>
