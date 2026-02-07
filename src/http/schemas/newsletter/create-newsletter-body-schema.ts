import { numericIntegerStringSchema } from '@schemas/utils/generic-components/numeric-integer-string-schema'
import { limitedNonemptyTextSchema } from '@schemas/utils/primitives/limited-nonempty-text-schema'
import z from 'zod'

export const createNewsletterBodySchema = z.object({
  sequenceNumber: numericIntegerStringSchema,
  editionNumber: limitedNonemptyTextSchema,
  volume: limitedNonemptyTextSchema,
  contentFilename: limitedNonemptyTextSchema,
})
