import type { Prisma } from '@prisma/generated/client'

export interface UpdateNewsletterQuery {
  id: number
  data: Prisma.NewsletterUpdateInput
}
