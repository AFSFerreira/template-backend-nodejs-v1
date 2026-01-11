import { meetingPaymentInfo } from '@schemas/utils/components/meeting/meeting-payment-info'
import { rangedDateArraySchema } from '@schemas/utils/generic-components/ranged-date-array-schema'
import { limitedNonemptyTextSchema } from '@schemas/utils/primitives/limited-nonempty-text-schema'
import { longLimitedNonemptyTextSchema } from '@schemas/utils/primitives/long-limited-nonempty-text-schema'
import { nonemptyTextSchema } from '@schemas/utils/primitives/nonempty-text-schema'
import z from 'zod'

export const createMeetingBodySchema = z.object({
  title: limitedNonemptyTextSchema,
  bannerImage: longLimitedNonemptyTextSchema,
  agenda: longLimitedNonemptyTextSchema,
  description: nonemptyTextSchema,
  location: limitedNonemptyTextSchema,
  dates: rangedDateArraySchema.min(1),
  paymentInfo: meetingPaymentInfo,
})
