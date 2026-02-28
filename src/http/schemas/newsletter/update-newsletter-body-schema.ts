import { newsletterContentSchema } from '@lib/zod/utils/components/newsletter/newsletter-content-schema'
import { limitedNonemptyTextSchema } from '@lib/zod/utils/primitives/limited-nonempty-text-schema'
import z from 'zod'

export const updateNewsletterBodySchema = z
  .object({
    sequenceNumber: limitedNonemptyTextSchema,
    editionNumber: limitedNonemptyTextSchema,
    volume: limitedNonemptyTextSchema,
    content: newsletterContentSchema,
  })
  .partial()
