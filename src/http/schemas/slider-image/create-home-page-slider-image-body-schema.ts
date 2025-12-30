import { longLimitedNonemptyTextSchema } from '@schemas/utils/primitives/long-limited-nonempty-text-schema'
import { urlSchema } from '@schemas/utils/primitives/url-schema'
import z from 'zod'

export const createHomePageSliderImageBodySchema = z.object({
  image: longLimitedNonemptyTextSchema,
  link: urlSchema.optional(),
})
