import { positiveNumberSchema } from '@schemas/utils/primitives/positive-number-schema'
import { rangedDateSchema } from '@schemas/utils/primitives/ranged-date-schema'
import z from 'zod'

export const meetingPaymentInfo = z.object({
  value: positiveNumberSchema,
  limitDate: rangedDateSchema,
})
