import type { exportMeetingEnrollmentsParamsSchema } from '@http/schemas/meeting/export-meeting-enrollments-params-schema'
import type { z } from 'zod'

export type ExportMeetingEnrollmentsParamsType = typeof exportMeetingEnrollmentsParamsSchema

export type ExportMeetingEnrollmentsParamsSchemaType = z.infer<ExportMeetingEnrollmentsParamsType>
