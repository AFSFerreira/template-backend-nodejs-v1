import type { updateMeetingParamsSchema } from '@http/schemas/meeting/update-meeting-params-schema'
import type z from 'zod'

export type UpdateMeetingParamsType = typeof updateMeetingParamsSchema

export type UpdateMeetingParamsSchemaType = z.infer<UpdateMeetingParamsType>
