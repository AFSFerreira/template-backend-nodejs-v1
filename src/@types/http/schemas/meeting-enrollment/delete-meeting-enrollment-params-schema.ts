import type { deleteMeetingEnrollmentParamsSchema } from '@http/schemas/meeting-enrollment/delete-meeting-enrollment-params-schema'
import type { z } from 'zod'

export type DeleteMeetingEnrollmentParamsType = typeof deleteMeetingEnrollmentParamsSchema

export type DeleteMeetingEnrollmentParamsSchemaType = z.infer<DeleteMeetingEnrollmentParamsType>
