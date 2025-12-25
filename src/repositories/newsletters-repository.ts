import type { CreateNewsletterQuery } from '@custom-types/repository/newsletter/create-newsletter-query'
import type { Newsletter, Prisma } from '@prisma/client'

export interface NewslettersRepository {
  create: (data: CreateNewsletterQuery) => Promise<Newsletter>
  totalCount: (where?: Prisma.NewsletterWhereInput) => Promise<number>
}
