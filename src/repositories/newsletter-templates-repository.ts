import type { PaginatedResult } from '@custom-types/custom/pagination-meta-type'
import type { ListAllNewsletterTemplatesQuery } from '@custom-types/repository/prisma/newsletter-template/list-all-newsletter-templates-query'
import type { NewsletterTemplate } from '@prisma/generated/client'

export interface NewsletterTemplatesRepository {
  findById: (id: number) => Promise<NewsletterTemplate | null>
  findByPublicId: (publicId: string) => Promise<NewsletterTemplate | null>
  listAll: (query: ListAllNewsletterTemplatesQuery) => Promise<PaginatedResult<NewsletterTemplate[]>>
}
