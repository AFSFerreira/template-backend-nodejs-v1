import type { ListAllNewsletterTemplatesQuery } from '@custom-types/repository/prisma/newsletter-template/list-all-newsletter-templates-query'
import type { DatabaseContext } from '@lib/prisma/helpers/database-context'
import type { NewsletterTemplatesRepository } from '@repositories/newsletter-templates-repository'
import { tsyringeTokens } from '@lib/tsyringe/helpers/tokens'
import { evalOffset } from '@utils/generics/eval-offset'
import { evalTotalPages } from '@utils/generics/eval-total-pages'
import { inject, singleton } from 'tsyringe'

@singleton()
export class PrismaNewsletterTemplatesRepository implements NewsletterTemplatesRepository {
  constructor(
    @inject(tsyringeTokens.infra.database)
    private readonly dbContext: DatabaseContext,
  ) {}

  async findById(id: number) {
    const template = await this.dbContext.client.newsletterTemplate.findUnique({ where: { id } })
    return template
  }

  async findByPublicId(publicId: string) {
    const template = await this.dbContext.client.newsletterTemplate.findUnique({ where: { publicId } })
    return template
  }

  async listAll(query: ListAllNewsletterTemplatesQuery) {
    const { limit: take, offset: skip } = evalOffset({ page: query.page, limit: query.limit })

    const [countResult, templates] = await Promise.all([
      this.dbContext.client.newsletterTemplate.count(),
      this.dbContext.client.newsletterTemplate.findMany({
        skip,
        take,
        orderBy: { id: 'asc' },
      }),
    ])

    const pageSize = query.limit
    const totalItems = countResult

    const totalPages = evalTotalPages({ pageSize, totalItems })

    return {
      data: templates,
      meta: {
        totalItems,
        totalPages,
        currentPage: query.page,
        pageSize,
      },
    }
  }
}
