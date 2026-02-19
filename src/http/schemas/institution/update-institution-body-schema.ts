import { limitedNonemptyTextSchema } from '@lib/zod/utils/primitives/limited-nonempty-text-schema'
import z from 'zod'

export const updateInstitutionBodySchema = z
  .object({
    name: limitedNonemptyTextSchema,
  })
  .partial()
