import { modelPublicIdSchema } from '@lib/zod/utils/generic-components/model-public-id-schema'
import { limitedNonemptyTextSchema } from '@lib/zod/utils/primitives/limited-nonempty-text-schema'
import z from 'zod'
import { proseMirrorSchema } from '../utils/components/blog/prose-mirror-schema'
import { newsletterNumberSchema } from '../utils/components/newsletter/newsletter-number-schema'

export const previewNewsletterContentBodySchema = z.object({
  sequenceNumber: newsletterNumberSchema,
  editionNumber: newsletterNumberSchema,
  volume: limitedNonemptyTextSchema,
  proseContent: proseMirrorSchema,
  templateId: modelPublicIdSchema,
})
