import { anySchema } from '@lib/zod/utils/primitives/any-schema'
import { limitedNonemptyTextSchema } from '@lib/zod/utils/primitives/limited-nonempty-text-schema'
import z from 'zod'

export const wsMessageSchema = z.object({
  action: limitedNonemptyTextSchema,
  token: limitedNonemptyTextSchema.optional(),
  payload: anySchema.optional(),
})
