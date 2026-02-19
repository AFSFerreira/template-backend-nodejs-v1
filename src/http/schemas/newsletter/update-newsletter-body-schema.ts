import { limitedNonemptyTextSchema } from '@lib/zod/utils/primitives/limited-nonempty-text-schema'
import z from 'zod'

export const updateNewsletterBodySchema = z
  .object({
    sequenceNumber: limitedNonemptyTextSchema,
    editionNumber: limitedNonemptyTextSchema,
    volume: limitedNonemptyTextSchema,
    contentFilename: limitedNonemptyTextSchema,
  })
  .partial()
