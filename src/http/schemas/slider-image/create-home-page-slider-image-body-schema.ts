import { longLimitedNonemptyTextSchema } from '@schemas/utils/primitives/long-limited-nonempty-text-schema'
import z from 'zod'

export const createHomePageSliderImageBodySchema = z.object({
  image: longLimitedNonemptyTextSchema,
  link: longLimitedNonemptyTextSchema.optional(),
})
