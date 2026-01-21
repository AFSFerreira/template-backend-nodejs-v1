import { limitedNonemptyTextSchema } from '@schemas/utils/primitives/limited-nonempty-text-schema'
import z from 'zod'

export const createInstitutionBodySchema = z.object({
  name: limitedNonemptyTextSchema,
})
