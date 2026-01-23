import type { deleteMeetingParamsSchema } from '@schemas/meeting/delete-meeting-params-schema'
import type { z } from 'zod'

export type DeleteMeetingParamsSchema = z.infer<typeof deleteMeetingParamsSchema>
