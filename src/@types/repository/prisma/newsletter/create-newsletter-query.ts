import type { InputJsonValue } from '@prisma/client/runtime/client'
import type { Prisma } from '@prisma/generated/client'
import type { NewsletterFormatType } from '@prisma/generated/enums'

export interface CreateNewsletterQuery {
  sequenceNumber: string
  editionNumber: string
  volume: string
  format: NewsletterFormatType
  fileContent?: string | null
  proseContent?: InputJsonValue | typeof Prisma.DbNull
  newsletterTemplateId: number
}
