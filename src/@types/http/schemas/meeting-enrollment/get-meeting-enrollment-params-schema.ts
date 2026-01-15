import type { getMeetingEnrollmentParamsSchema } from '@schemas/meeting-enrollment/get-meeting-enrollment-params-schema'
import type { z } from 'zod'

export type GetMeetingEnrollmentParamsSchemaType = z.infer<typeof getMeetingEnrollmentParamsSchema>
