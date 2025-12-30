import { booleanSchema } from '@schemas/utils/primitives/boolean-schema'
import { positiveIntegerSchema } from '@schemas/utils/primitives/positive-integer-schema'
import { urlSchema } from '@schemas/utils/primitives/url-schema'
import z from 'zod'

export const updateSliderImageBodySchema = z
  .object({
    link: urlSchema,
    order: positiveIntegerSchema,
    isActive: booleanSchema,
  })
  .partial()
