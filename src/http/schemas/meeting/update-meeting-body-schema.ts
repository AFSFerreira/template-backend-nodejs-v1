import { meetingPaymentInfo } from '@schemas/utils/components/meeting/meeting-payment-info'
import { paymentInfoSchema } from '@schemas/utils/components/payment-info/payment-info-schema'
import { rangedDateArraySchema } from '@schemas/utils/generic-components/ranged-date-array-schema'
import { limitedNonemptyTextSchema } from '@schemas/utils/primitives/limited-nonempty-text-schema'
import { longLimitedNonemptyTextSchema } from '@schemas/utils/primitives/long-limited-nonempty-text-schema'
import { nonemptyTextSchema } from '@schemas/utils/primitives/nonempty-text-schema'
import z from 'zod'

export const updateMeetingBodySchema = z
  .object({
    title: limitedNonemptyTextSchema,
    bannerImage: longLimitedNonemptyTextSchema,
    agenda: longLimitedNonemptyTextSchema,
    description: nonemptyTextSchema,
    location: limitedNonemptyTextSchema,
    dates: rangedDateArraySchema.min(1),
    paymentMeetingInfo: meetingPaymentInfo,
    paymentInfo: paymentInfoSchema,
  })
  .partial()
