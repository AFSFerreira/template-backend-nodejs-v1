import type { exportMeetingEnrollmentsQuerySchema } from '@http/schemas/meeting/export-meeting-enrollments-query-schema'
import type { z } from 'zod'

export type ExportMeetingEnrollmentsQueryType = typeof exportMeetingEnrollmentsQuerySchema

export type ExportMeetingEnrollmentsQuerySchemaType = z.infer<ExportMeetingEnrollmentsQueryType>
