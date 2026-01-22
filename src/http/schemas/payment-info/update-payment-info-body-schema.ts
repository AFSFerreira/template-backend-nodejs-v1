import { nonemptyTextSchema } from '@schemas/utils/primitives/nonempty-text-schema'
import z from 'zod'

export const updatePaymentInfoBodySchema = z
  .object({
    pixKey: nonemptyTextSchema,
    bank: nonemptyTextSchema,
    code: nonemptyTextSchema,
    agency: nonemptyTextSchema,
    account: nonemptyTextSchema,
  })
  .partial()
