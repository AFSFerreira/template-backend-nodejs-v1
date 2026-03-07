import type { MeetingEnrollment } from '@prisma/generated/client'
import { modelPublicIdSchema } from '@lib/zod/utils/generic-components/model-public-id-schema'
import { dateSchema } from '@lib/zod/utils/primitives/date-schema'
import { numberSchema } from '@lib/zod/utils/primitives/number-schema'
import z from 'zod'

export interface MeetingEnrollmentDefaultPresenterInput extends MeetingEnrollment {}

const httpMeetingEnrollmentSchema = z.object({
  id: modelPublicIdSchema,
  meetingId: numberSchema,
  createdAt: dateSchema,
})

export type HTTPMeetingEnrollment = z.infer<typeof httpMeetingEnrollmentSchema>
