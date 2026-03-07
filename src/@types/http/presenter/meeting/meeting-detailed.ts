import type { MeetingWithDetails } from '@custom-types/validators/meeting-with-details'
import { modelPublicIdSchema } from '@lib/zod/utils/generic-components/model-public-id-schema'
import { dateArraySchema } from '@lib/zod/utils/primitives/date-array-schema'
import { dateSchema } from '@lib/zod/utils/primitives/date-schema'
import { nonemptyTextSchema } from '@lib/zod/utils/primitives/nonempty-text-schema'
import z from 'zod'

export interface MeetingDetailedPresenterInput extends MeetingWithDetails {}

const httpMeetingPaymentInfoSchema = z.object({
  code: nonemptyTextSchema,
  pixKey: nonemptyTextSchema,
  bank: nonemptyTextSchema,
  agency: nonemptyTextSchema,
  account: nonemptyTextSchema,
  billingEmail: nonemptyTextSchema,
  value: nonemptyTextSchema,
  limitDate: dateSchema,
})

const httpMeetingWithDetailsSchema = z.object({
  id: modelPublicIdSchema,
  title: nonemptyTextSchema,
  bannerImage: nonemptyTextSchema,
  description: nonemptyTextSchema,
  lastDate: dateSchema,
  agenda: nonemptyTextSchema,
  location: nonemptyTextSchema,
  meetingPaymentInfo: httpMeetingPaymentInfoSchema.optional(),
  meetingDates: dateArraySchema,
})

export type HTTPMeetingWithDetails = z.infer<typeof httpMeetingWithDetailsSchema>
