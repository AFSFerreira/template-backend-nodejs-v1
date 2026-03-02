import type { exportMeetingEnrollmentsParamsSchema } from '@http/schemas/meeting/export-meeting-enrollments-params-schema'
import type { z } from 'zod'

export type ExportMeetingEnrollmentsParamsSchemaType = z.infer<typeof exportMeetingEnrollmentsParamsSchema>
