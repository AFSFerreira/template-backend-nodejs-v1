import type { NewsletterWithDetails } from '@custom-types/validators/newsletter-with-details'
import { modelPublicIdSchema } from '@lib/zod/utils/generic-components/model-public-id-schema'
import { dateSchema } from '@lib/zod/utils/primitives/date-schema'
import { nonemptyTextSchema } from '@lib/zod/utils/primitives/nonempty-text-schema'
import z from 'zod'

export interface NewsletterDefaultPresenterInput extends NewsletterWithDetails {}

export const httpNewsletterSchema = z.object({
  id: modelPublicIdSchema,
  editionNumber: nonemptyTextSchema,
  sequenceNumber: nonemptyTextSchema,
  content: nonemptyTextSchema,
  volume: nonemptyTextSchema,
  createdAt: dateSchema,
  updatedAt: dateSchema,
})

export type HTTPNewsletter = z.infer<typeof httpNewsletterSchema>
