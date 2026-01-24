import { bankCodeSchema } from '@schemas/utils/generic-components/bank-code-schema'
import { pixSchema } from '@schemas/utils/generic-components/pix-schema'
import { nonemptyTextSchema } from '@schemas/utils/primitives/nonempty-text-schema'
import z from 'zod'

export const paymentInfoSchema = z.object({
  pixKey: pixSchema,
  bank: nonemptyTextSchema,
  code: bankCodeSchema,
  agency: nonemptyTextSchema,
  account: nonemptyTextSchema,
})
