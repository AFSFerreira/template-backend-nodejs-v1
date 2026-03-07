import type { Newsletter } from '@prisma/generated/client'
import { modelPublicIdSchema } from '@lib/zod/utils/generic-components/model-public-id-schema'
import { dateSchema } from '@lib/zod/utils/primitives/date-schema'
import { nonemptyTextSchema } from '@lib/zod/utils/primitives/nonempty-text-schema'
import z from 'zod'

export type NewsletterWithContentUrl = Newsletter & { contentUrl: string }

export interface NewsletterDefaultPresenterInput extends NewsletterWithContentUrl {}

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
