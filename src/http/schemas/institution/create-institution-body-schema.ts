import { limitedNonemptyTextSchema } from '@lib/zod/utils/primitives/limited-nonempty-text-schema'
import z from 'zod'

export const createInstitutionBodySchema = z.object({
  name: limitedNonemptyTextSchema,
})
