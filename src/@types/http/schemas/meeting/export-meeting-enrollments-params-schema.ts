import type { exportMeetingEnrollmentsParamsSchema } from '@schemas/meeting/export-meeting-enrollments-params-schema'
import type { z } from 'zod'

export type ExportMeetingEnrollmentsParamsSchemaType = z.infer<typeof exportMeetingEnrollmentsParamsSchema>
