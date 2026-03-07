import type { NewsletterWithContentUrl } from '@custom-types/http/presenter/newsletter/newsletter-default'
import { proseMirrorSchema } from '@http/schemas/utils/components/blog/prose-mirror-schema'
import { newsletterFormatTypeEnumSchema } from '@lib/zod/utils/enums/newsletter-format-type-enum-schema'
import { modelPublicIdSchema } from '@lib/zod/utils/generic-components/model-public-id-schema'
import { dateSchema } from '@lib/zod/utils/primitives/date-schema'
import { nonemptyTextSchema } from '@lib/zod/utils/primitives/nonempty-text-schema'
import { nullableTextSchema } from '@lib/zod/utils/primitives/nullable-text-schema'
import z from 'zod'

export interface NewsletterDetailedWithContentPresenterInput extends NewsletterWithContentUrl {}

export const httpNewsletterDetailedWithContentSchema = z.object({
  id: modelPublicIdSchema,
  editionNumber: nonemptyTextSchema,
  sequenceNumber: nonemptyTextSchema,
  content: nonemptyTextSchema,
  format: newsletterFormatTypeEnumSchema,
  volume: nonemptyTextSchema,
  createdAt: dateSchema,
  updatedAt: dateSchema,
  proseContent: proseMirrorSchema.nullable(),
  fileContent: nullableTextSchema,
})

export type HTTPNewsletterDetailedWithContent = z.infer<typeof httpNewsletterDetailedWithContentSchema>
