import type { MeetingEnrollmentWithDetails } from '@custom-types/validators/meeting-enrollment-with-details'
import { educationLevelSchema } from '@lib/zod/utils/enums/education-level-enum-schema'
import { occupationEnumSchema } from '@lib/zod/utils/enums/occupation-enum-schema'
import { modelPublicIdSchema } from '@lib/zod/utils/generic-components/model-public-id-schema'
import { booleanSchema } from '@lib/zod/utils/primitives/boolean-schema'
import { dateSchema } from '@lib/zod/utils/primitives/date-schema'
import { nonemptyTextSchema } from '@lib/zod/utils/primitives/nonempty-text-schema'
import z from 'zod'

export interface MeetingEnrollmentPresenterInput extends MeetingEnrollmentWithDetails {}

export const userParticipantInfoSchema = z.object({
  id: modelPublicIdSchema,
  fullName: nonemptyTextSchema,
  email: nonemptyTextSchema,
  profileImage: nonemptyTextSchema,
  educationLevel: educationLevelSchema,
  occupation: occupationEnumSchema.nullable().optional(),
  wantsNewsletter: booleanSchema,
})

export const guestParticipantInfoSchema = z.object({
  fullName: nonemptyTextSchema,
  email: nonemptyTextSchema,
  institutionName: nonemptyTextSchema,
  departmentName: nonemptyTextSchema,
  occupation: occupationEnumSchema,
  educationLevel: educationLevelSchema,
  wantsNewsletter: booleanSchema,
})

export const httpMeetingEnrollmentDetailedSchema = z.object({
  createdAt: dateSchema,
  user: userParticipantInfoSchema.nullable(),
  guest: guestParticipantInfoSchema.nullable(),
})

export type UserParticipantInfo = z.infer<typeof userParticipantInfoSchema>
export type GuestParticipantInfo = z.infer<typeof guestParticipantInfoSchema>
export type HTTPMeetingEnrollmentDetailed = z.infer<typeof httpMeetingEnrollmentDetailedSchema>
