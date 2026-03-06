import type { createMeetingBodySchema } from '@http/schemas/meeting/create-meeting-body-schema'
import type z from 'zod'

export type CreateMeetingBodyType = typeof createMeetingBodySchema

export type CreateMeetingBodySchemaType = z.infer<CreateMeetingBodyType>
