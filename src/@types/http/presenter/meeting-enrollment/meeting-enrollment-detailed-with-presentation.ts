import type { MeetingEnrollmentWithDetails } from '@custom-types/validators/meeting-enrollment-with-details'
import { educationLevelSchema } from '@lib/zod/utils/enums/education-level-enum-schema'
import { occupationEnumSchema } from '@lib/zod/utils/enums/occupation-enum-schema'
import { presentationTypeEnumSchema } from '@lib/zod/utils/enums/presentation-type-enum-schema'
import { modelPublicIdSchema } from '@lib/zod/utils/generic-components/model-public-id-schema'
import { booleanSchema } from '@lib/zod/utils/primitives/boolean-schema'
import { dateSchema } from '@lib/zod/utils/primitives/date-schema'
import { nonemptyTextSchema } from '@lib/zod/utils/primitives/nonempty-text-schema'
import { nullableTextSchema } from '@lib/zod/utils/primitives/nullable-text-schema'
import { optionalNonemptyTextSchema } from '@lib/zod/utils/primitives/optional-nonempty-text-schema'
import z from 'zod'

export interface MeetingEnrollmentDetailedWithPresentationPresenterInput extends MeetingEnrollmentWithDetails {}

const userParticipantInfoSchema = z.object({
  id: modelPublicIdSchema,
  fullName: nonemptyTextSchema,
  email: nonemptyTextSchema,
  institutionName: optionalNonemptyTextSchema,
  departmentName: nullableTextSchema,
  educationLevel: educationLevelSchema,
  occupation: occupationEnumSchema.nullable().optional(),
  wantsNewsletter: booleanSchema,
})

const guestParticipantInfoSchema = z.object({
  fullName: nonemptyTextSchema,
  email: nonemptyTextSchema,
  institutionName: nonemptyTextSchema,
  departmentName: nonemptyTextSchema,
  occupation: occupationEnumSchema,
  educationLevel: educationLevelSchema,
  wantsNewsletter: booleanSchema,
})

const presentationAuthorInfoSchema = z.object({
  name: nonemptyTextSchema,
})

const presentationAffiliationInfoSchema = z.object({
  name: nonemptyTextSchema,
})

const presentationInfoSchema = z.object({
  title: nonemptyTextSchema,
  description: nonemptyTextSchema,
  presentationType: presentationTypeEnumSchema,
  authors: z.array(presentationAuthorInfoSchema),
  affiliations: z.array(presentationAffiliationInfoSchema),
})

const httpMeetingEnrollmentDetailedWithPresentationSchema = z.object({
  id: modelPublicIdSchema,
  createdAt: dateSchema,
  user: userParticipantInfoSchema.nullable(),
  guest: guestParticipantInfoSchema.nullable(),
  presentation: presentationInfoSchema.nullable(),
})

export type UserParticipantInfo = z.infer<typeof userParticipantInfoSchema>
export type GuestParticipantInfo = z.infer<typeof guestParticipantInfoSchema>
export type PresentationAuthorInfo = z.infer<typeof presentationAuthorInfoSchema>
export type PresentationAffiliationInfo = z.infer<typeof presentationAffiliationInfoSchema>
export type PresentationInfo = z.infer<typeof presentationInfoSchema>
export type HTTPMeetingEnrollmentDetailedWithPresentation = z.infer<
  typeof httpMeetingEnrollmentDetailedWithPresentationSchema
>
