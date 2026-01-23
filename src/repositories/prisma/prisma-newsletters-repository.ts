import type { CreateNewsletterQuery } from '@custom-types/repository/prisma/newsletter/create-newsletter-query'
import type { FindConflictingNewsletterQuery } from '@custom-types/repository/prisma/newsletter/find-conflicting-newsletter-query'
import type { ListAllNewslettersQuery } from '@custom-types/repository/prisma/newsletter/list-all-newsletters-query'
import type { UpdateNewsletterQuery } from '@custom-types/repository/prisma/newsletter/update-newsletter-query'
import type { DatabaseContext } from '@lib/prisma/helpers/database-context'
import type { Newsletter, Prisma } from '@prisma/client'
import type { NewslettersRepository } from '@repositories/newsletters-repository'
import { tsyringeTokens } from '@lib/tsyringe/helpers/tokens'
import { evalOffset } from '@utils/generics/eval-offset'
import { evalTotalPages } from '@utils/generics/eval-total-pages'
import { inject, injectable } from 'tsyringe'

@injectable()
export class PrismaNewslettersRepository implements NewslettersRepository {
  constructor(
    @inject(tsyringeTokens.infra.database)
    private readonly dbContext: DatabaseContext,
  ) {}

  async create(data: CreateNewsletterQuery): Promise<Newsletter> {
    const newsletter = await this.dbContext.client.newsletter.create({ data })
    return newsletter
  }

  async findByPublicId(publicId: string): Promise<Newsletter | null> {
    const newsletter = await this.dbContext.client.newsletter.findUnique({ where: { publicId } })
    return newsletter
  }

  async findConflictingNewsletter({ sequenceNumber, editionNumber, volume }: FindConflictingNewsletterQuery) {
    const newsletter = await this.dbContext.client.newsletter.findFirst({
      where: {
        OR: [{ sequenceNumber }, { editionNumber, volume }],
      },
    })
    return newsletter
  }

  async update(query: UpdateNewsletterQuery) {
    const newsletter = await this.dbContext.client.newsletter.update({
      where: { id: query.id },
      data: query.data,
    })
    return newsletter
  }

  async totalCount(where?: Prisma.NewsletterWhereInput) {
    const totalNewsletters = await this.dbContext.client.newsletter.count({ where })
    return totalNewsletters
  }

  async listAll(query?: ListAllNewslettersQuery) {
    const orderBy: Prisma.NewsletterOrderByWithRelationInput[] = [
      {
        createdAt: 'desc',
      },
      {
        id: 'desc',
      },
      ...(query?.orderBy?.sequenceNumberOrder ? [{ sequenceNumber: query?.orderBy?.sequenceNumberOrder }] : []),
    ]

    if (!query) {
      const newsletters = await this.dbContext.client.newsletter.findMany({ orderBy })

      return {
        data: newsletters,
        meta: {
          totalItems: newsletters.length,
          totalPages: 1,
          currentPage: 1,
          pageSize: newsletters.length,
        },
      }
    }

    const where: Prisma.NewsletterWhereInput = {
      editionNumber: {
        contains: query.editionNumber,
        mode: 'insensitive',
      },
      sequenceNumber: {
        contains: query.sequenceNumber,
        mode: 'insensitive',
      },
      volume: {
        contains: query.volume,
        mode: 'insensitive',
      },
    }

    const { limit: take, offset: skip } = evalOffset({ page: query.page, limit: query.limit })

    const [countResult, newsletters] = await Promise.all([
      this.dbContext.client.newsletter.count({ where }),
      this.dbContext.client.newsletter.findMany({
        where,
        skip,
        take,
        orderBy,
      }),
    ])

    const pageSize = query.limit
    const totalItems = countResult

    const totalPages = evalTotalPages({ pageSize, totalItems })

    return {
      data: newsletters,
      meta: {
        totalItems,
        totalPages,
        currentPage: query.page,
        pageSize,
      },
    }
  }

  async delete(id: number): Promise<void> {
    await this.dbContext.client.newsletter.delete({ where: { id } })
  }
}
