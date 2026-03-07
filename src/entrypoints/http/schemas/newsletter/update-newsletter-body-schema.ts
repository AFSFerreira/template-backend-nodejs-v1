import { modelPublicIdSchema } from '@lib/zod/utils/generic-components/model-public-id-schema'
import { limitedNonemptyTextSchema } from '@lib/zod/utils/primitives/limited-nonempty-text-schema'
import z from 'zod'
import { newsletterContentSchema } from '../utils/components/newsletter/newsletter-content-schema'

export const updateNewsletterBodySchema = z
  .object({
    sequenceNumber: limitedNonemptyTextSchema,
    editionNumber: limitedNonemptyTextSchema,
    volume: limitedNonemptyTextSchema,
    content: newsletterContentSchema,
    templateId: modelPublicIdSchema,
  })
  .partial()
