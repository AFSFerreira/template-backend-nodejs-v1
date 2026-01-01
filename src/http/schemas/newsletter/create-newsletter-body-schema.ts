import { limitedNonemptyTextSchema } from '@schemas/utils/primitives/limited-nonempty-text-schema'
import z from 'zod'

export const createNewsletterBodySchema = z.object({
  sequenceNumber: limitedNonemptyTextSchema,
  editionNumber: limitedNonemptyTextSchema,
  volume: limitedNonemptyTextSchema,
  contentFilename: limitedNonemptyTextSchema,
})
