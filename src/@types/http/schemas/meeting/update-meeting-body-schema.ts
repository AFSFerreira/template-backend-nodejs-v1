import type { updateMeetingBodySchema } from '@schemas/meeting/update-meeting-body-schema'
import type z from 'zod'

export type UpdateMeetingBodySchemaType = z.infer<typeof updateMeetingBodySchema>
