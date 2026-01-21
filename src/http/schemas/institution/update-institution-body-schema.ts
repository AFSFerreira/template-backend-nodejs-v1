import { limitedNonemptyTextSchema } from '@schemas/utils/primitives/limited-nonempty-text-schema'
import z from 'zod'

export const updateInstitutionBodySchema = z
  .object({
    name: limitedNonemptyTextSchema,
  })
  .partial()
