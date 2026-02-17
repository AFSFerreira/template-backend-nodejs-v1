import type { Newsletter } from '@prisma/generated/client'

export type NewsletterWithContent = Omit<Newsletter, 'content'> & { content: string }

export interface NewsletterDefaultPresenterInput extends NewsletterWithContent {}

export interface HTTPNewsletter {
  id: string
  editionNumber: string
  sequenceNumber: string
  content: string
  volume: string
  createdAt: Date
  updatedAt: Date
}
