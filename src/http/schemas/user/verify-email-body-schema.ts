import { z } from 'zod'
import { nonemptyTextSchema } from '../../../lib/zod/utils/primitives/nonempty-text-schema'

export const verifyEmailBodySchema = z.object({
  token: nonemptyTextSchema,
})
