import { limitedNonemptyTextSchema } from '@schemas/utils/primitives/limited-nonempty-text-schema'
import { nonemptyTextSchema } from '@schemas/utils/primitives/nonempty-text-schema'
import { positiveIntegerSchema } from '@schemas/utils/primitives/positive-integer-schema'
import z from 'zod'

export const updateDirectorPositionBodySchema = z
  .object({
    position: limitedNonemptyTextSchema,
    precedence: positiveIntegerSchema,
    description: nonemptyTextSchema,
  })
  .partial()
