import type { PaginatedResult } from '@custom-types/custom/pagination-meta-type'
import type { CreateNewsletterQuery } from '@custom-types/repository/prisma/newsletter/create-newsletter-query'
import type { FindConflictingNewsletterQuery } from '@custom-types/repository/prisma/newsletter/find-conflicting-newsletter-query'
import type { ListAllNewslettersQuery } from '@custom-types/repository/prisma/newsletter/list-all-newsletters-query'
import type { UpdateNewsletterQuery } from '@custom-types/repository/prisma/newsletter/update-newsletter-query'
import type { NewsletterWithDetails } from '@custom-types/validators/newsletter-with-details'
import type { Newsletter, Prisma } from '@prisma/generated/client'

export interface NewslettersRepository {
  create: (data: CreateNewsletterQuery) => Promise<NewsletterWithDetails>
  findByPublicId: (publicId: string) => Promise<NewsletterWithDetails | null>
  findConflictingNewsletter: (query: FindConflictingNewsletterQuery) => Promise<Newsletter | null>
  update: (query: UpdateNewsletterQuery) => Promise<NewsletterWithDetails>
  totalCount: (where?: Prisma.NewsletterWhereInput) => Promise<number>
  listAll: (query: ListAllNewslettersQuery) => Promise<PaginatedResult<NewsletterWithDetails[]>>
  delete: (id: number) => Promise<void>
}
