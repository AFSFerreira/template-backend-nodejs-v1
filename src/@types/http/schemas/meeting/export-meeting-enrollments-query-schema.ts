import type { exportMeetingEnrollmentsQuerySchema } from '@schemas/meeting/export-meeting-enrollments-query-schema'
import type { z } from 'zod'

export type ExportMeetingEnrollmentsQuerySchemaType = z.infer<typeof exportMeetingEnrollmentsQuerySchema>
