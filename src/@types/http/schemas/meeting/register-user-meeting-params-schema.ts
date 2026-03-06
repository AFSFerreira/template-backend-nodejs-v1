import type { registerUserMeetingParamsSchema } from '@http/schemas/meeting/register-user-meeting-params-schema'
import type z from 'zod'

export type RegisterUserMeetingParamsType = typeof registerUserMeetingParamsSchema

export type RegisterUserMeetingParamsSchemaType = z.infer<RegisterUserMeetingParamsType>
