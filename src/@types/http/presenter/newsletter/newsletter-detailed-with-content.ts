import type { NewsletterWithContentUrl } from '@custom-types/http/presenter/newsletter/newsletter-default'
import type { NewsletterFormatType } from '@prisma/generated/enums'
import type { JsonValue } from '@prisma/generated/internal/prismaNamespace'

export interface NewsletterDetailedWithContentPresenterInput extends NewsletterWithContentUrl {}

export interface HTTPNewsletterDetailedWithContent {
  id: string
  editionNumber: string
  sequenceNumber: string
  content: string
  format: NewsletterFormatType
  volume: string
  createdAt: Date
  updatedAt: Date
  proseContent: JsonValue | null
  fileContent: string | null
}
