import { longLimitedNonemptyTextSchema } from '@lib/zod/utils/primitives/long-limited-nonempty-text-schema'
import { urlSchema } from '@lib/zod/utils/primitives/url-schema'
import z from 'zod'

export const createHomePageSliderImageBodySchema = z.object({
  image: longLimitedNonemptyTextSchema,
  link: urlSchema.optional(),
})
