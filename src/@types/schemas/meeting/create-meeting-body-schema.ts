import type { createMeetingBodySchema } from '@schemas/meeting/create-meeting-body-schema'
import type z from 'zod'

export type CreateMeetingBodySchemaType = z.infer<typeof createMeetingBodySchema>
