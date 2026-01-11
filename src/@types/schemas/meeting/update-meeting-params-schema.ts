import type { updateMeetingParamsSchema } from '@schemas/meeting/update-meeting-params-schema'
import type z from 'zod'

export type UpdateMeetingParamsSchemaType = z.infer<typeof updateMeetingParamsSchema>
