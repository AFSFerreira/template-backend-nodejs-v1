import type { Newsletter } from '@prisma/generated/client'

export type NewsletterWithContentUrl = Newsletter & { contentUrl: string }

export interface NewsletterDefaultPresenterInput extends NewsletterWithContentUrl {}

export interface HTTPNewsletter {
  id: string
  editionNumber: string
  sequenceNumber: string
  content: string
  volume: string
  createdAt: Date
  updatedAt: Date
}
