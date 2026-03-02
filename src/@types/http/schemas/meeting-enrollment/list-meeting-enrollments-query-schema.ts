import type { listMeetingEnrollmentsQuerySchema } from '@http/schemas/meeting-enrollment/list-meeting-enrollments-query-schema'
import type z from 'zod'

export type ListMeetingEnrollmentsQuerySchemaType = z.infer<typeof listMeetingEnrollmentsQuerySchema>
