import type { deleteMeetingParamsSchema } from '@http/schemas/meeting/delete-meeting-params-schema'
import type { z } from 'zod'

export type DeleteMeetingParamsType = typeof deleteMeetingParamsSchema

export type DeleteMeetingParamsSchema = z.infer<typeof deleteMeetingParamsSchema>
