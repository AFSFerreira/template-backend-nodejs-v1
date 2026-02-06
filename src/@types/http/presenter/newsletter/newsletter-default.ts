import type { Newsletter } from "@prisma/generated/client"

export interface NewsletterDefaultPresenterInput extends Newsletter {}

export interface HTTPNewsletter {
  id: string
  editionNumber: string
  sequenceNumber: string
  content: string
  volume: string
  createdAt: Date
  updatedAt: Date
}
