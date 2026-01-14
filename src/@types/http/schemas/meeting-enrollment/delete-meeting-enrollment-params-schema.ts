import type { deleteMeetingEnrollmentParamsSchema } from '@schemas/meeting-enrollment/delete-meeting-enrollment-params-schema'
import type { z } from 'zod'

export type DeleteMeetingEnrollmentParamsSchemaType = z.infer<typeof deleteMeetingEnrollmentParamsSchema>
