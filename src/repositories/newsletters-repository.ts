import type { PaginatedResult } from '@custom-types/custom/pagination-meta-type'
import type { CreateNewsletterQuery } from '@custom-types/repository/prisma/newsletter/create-newsletter-query'
import type { FindConflictingNewsletterQuery } from '@custom-types/repository/prisma/newsletter/find-conflicting-newsletter-query'
import type { ListAllNewslettersQuery } from '@custom-types/repository/prisma/newsletter/list-all-newsletters-query'
import type { UpdateNewsletterQuery } from '@custom-types/repository/prisma/newsletter/update-newsletter-query'
import type { Newsletter, Prisma } from '@prisma/client'

export interface NewslettersRepository {
  create: (data: CreateNewsletterQuery) => Promise<Newsletter>
  findByPublicId: (publicId: string) => Promise<Newsletter | null>
  findConflictingNewsletter: (query: FindConflictingNewsletterQuery) => Promise<Newsletter | null>
  update: (query: UpdateNewsletterQuery) => Promise<Newsletter>
  totalCount: (where?: Prisma.NewsletterWhereInput) => Promise<number>
  listAll: (query?: ListAllNewslettersQuery) => Promise<PaginatedResult<Newsletter[]>>
  delete: (id: number) => Promise<void>
}
