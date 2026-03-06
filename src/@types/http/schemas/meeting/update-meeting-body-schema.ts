import type { updateMeetingBodySchema } from '@http/schemas/meeting/update-meeting-body-schema'
import type z from 'zod'

export type UpdateMeetingBodyType = typeof updateMeetingBodySchema

export type UpdateMeetingBodySchemaType = z.infer<UpdateMeetingBodyType>
