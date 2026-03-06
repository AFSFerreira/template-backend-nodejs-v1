import { limitedNonemptyTextSchema } from '@lib/zod/utils/primitives/limited-nonempty-text-schema'
import { longLimitedNonemptyTextSchema } from '@lib/zod/utils/primitives/long-limited-nonempty-text-schema'
import { nonemptyTextSchema } from '@lib/zod/utils/primitives/nonempty-text-schema'
import z from 'zod'
import { meetingDatesSchema } from '../utils/components/meeting/meeting-dates-schema'
import { meetingPaymentInfo } from '../utils/components/meeting/meeting-payment-info-schema'

export const updateMeetingBodySchema = z
  .object({
    title: limitedNonemptyTextSchema,
    bannerImage: longLimitedNonemptyTextSchema,
    agenda: longLimitedNonemptyTextSchema,
    description: nonemptyTextSchema,
    location: limitedNonemptyTextSchema,
    dates: meetingDatesSchema,
    paymentMeetingInfo: meetingPaymentInfo,
  })
  .partial()
