import type { Prisma } from '@prisma/client'

export interface UpdateNewsletterQuery {
  id: number
  data: Prisma.NewsletterUpdateInput
}
