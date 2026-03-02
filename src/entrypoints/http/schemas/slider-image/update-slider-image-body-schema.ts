import { booleanSchema } from '@lib/zod/utils/primitives/boolean-schema'
import { positiveIntegerSchema } from '@lib/zod/utils/primitives/positive-integer-schema'
import { urlSchema } from '@lib/zod/utils/primitives/url-schema'
import z from 'zod'

export const updateSliderImageBodySchema = z
  .object({
    link: urlSchema,
    order: positiveIntegerSchema,
    isActive: booleanSchema,
  })
  .partial()
