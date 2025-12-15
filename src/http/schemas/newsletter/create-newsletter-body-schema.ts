import { limitedNonemptyTextSchema } from '@schemas/utils/primitives/limited-nonempty-text-schema'
import { nonemptyTextSchema } from '@schemas/utils/primitives/nonempty-text-schema'
import z from 'zod'

export const createNewsletterBodySchema = z.object({
  title: limitedNonemptyTextSchema,
  sequenceNumber: limitedNonemptyTextSchema,
  editionNumber: limitedNonemptyTextSchema,
  volume: limitedNonemptyTextSchema,
  contentFileName: nonemptyTextSchema,
})
