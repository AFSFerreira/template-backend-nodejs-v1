import { limitedNonemptyTextSchema } from '@lib/zod/utils/primitives/limited-nonempty-text-schema'
import { optionalNonemptyTextSchema } from '@lib/zod/utils/primitives/optional-nonempty-text-schema'
import { positiveIntegerSchema } from '@lib/zod/utils/primitives/positive-integer-schema'
import z from 'zod'

export const createDirectorPositionBodySchema = z.object({
  position: limitedNonemptyTextSchema,
  precedence: positiveIntegerSchema,
  description: optionalNonemptyTextSchema,
})
