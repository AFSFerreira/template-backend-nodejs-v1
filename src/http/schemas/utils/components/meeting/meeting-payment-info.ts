import { bankCodeSchema } from '@schemas/utils/generic-components/bank-code-schema'
import { emailSchema } from '@schemas/utils/generic-components/email-schema'
import { pixSchema } from '@schemas/utils/generic-components/pix-schema'
import { nonemptyTextSchema } from '@schemas/utils/primitives/nonempty-text-schema'
import { positiveNumberSchema } from '@schemas/utils/primitives/positive-number-schema'
import { rangedDateSchema } from '@schemas/utils/primitives/ranged-date-schema'
import z from 'zod'

export const meetingPaymentInfo = z.object({
  pixKey: pixSchema,
  bank: nonemptyTextSchema,
  code: bankCodeSchema,
  agency: nonemptyTextSchema,
  account: nonemptyTextSchema,
  billingEmail: emailSchema,
  value: positiveNumberSchema,
  limitDate: rangedDateSchema,
})
