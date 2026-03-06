import type { registerUserMeetingBodySchema } from '@http/schemas/meeting/register-user-meeting-body-schema'
import type z from 'zod'

export type RegisterUserMeetingBodyType = typeof registerUserMeetingBodySchema

export type RegisterUserMeetingBodySchemaType = z.infer<RegisterUserMeetingBodyType>
