import { limitedNonemptyTextSchema } from '@lib/zod/utils/primitives/limited-nonempty-text-schema'
import { nonemptyTextSchema } from '@lib/zod/utils/primitives/nonempty-text-schema'
import { positiveIntegerSchema } from '@lib/zod/utils/primitives/positive-integer-schema'
import z from 'zod'

export const updateDirectorPositionBodySchema = z
  .object({
    position: limitedNonemptyTextSchema,
    precedence: positiveIntegerSchema,
    description: nonemptyTextSchema,
  })
  .partial()
