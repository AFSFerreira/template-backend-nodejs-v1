import { z } from 'zod'
import { nonemptyTextSchema } from '../utils/primitives/nonempty-text-schema'

export const verifyEmailBodySchema = z.object({
  token: nonemptyTextSchema,
})
