import { nonemptyTextSchema } from '@lib/zod/utils/primitives/nonempty-text-schema'
import { z } from 'zod'

export const confirmEmailChangeBodySchema = z.object({
  token: nonemptyTextSchema,
})
