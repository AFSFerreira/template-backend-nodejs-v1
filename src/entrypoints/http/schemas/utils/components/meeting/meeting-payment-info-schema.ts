import { bankCodeSchema } from '@lib/zod/utils/generic-components/bank-code-schema'
import { emailSchema } from '@lib/zod/utils/generic-components/email-schema'
import { pixSchema } from '@lib/zod/utils/generic-components/pix-schema'
import { nonemptyTextSchema } from '@lib/zod/utils/primitives/nonempty-text-schema'
import { positiveNumberSchema } from '@lib/zod/utils/primitives/positive-number-schema'
import { rangedDateSchema } from '@lib/zod/utils/primitives/ranged-date-schema'
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
