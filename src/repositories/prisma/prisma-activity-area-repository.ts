import type { QueryMode } from '@custom-types/custom/query-mode'
import type { ActivityAreaQuery } from '@custom-types/repositories/activity-area/activity-area-query'
import type { ListAllActivityAreasQuery } from '@custom-types/repositories/activity-area/list-all-activity-areas-query'
import type { OrderableType } from '@custom-types/validator/orderable'
import type { DatabaseContext } from '@lib/prisma/helpers/database-context'
import { tokens } from '@lib/tsyringe/helpers/tokens'
import type { Prisma } from '@prisma/client'
import type { ActivityAreasRepository } from '@repositories/activity-areas-repository'
import { evalOffset } from '@utils/generics/eval-offset'
import { evalTotalPages } from '@utils/generics/eval-total-pages'
import { inject, injectable } from 'tsyringe'

@injectable()
export class PrismaActivityAreasRepository implements ActivityAreasRepository {
  constructor(
    @inject(tokens.infra.database)
    private readonly dbContext: DatabaseContext,
  ) {}
  static buildStartsWithFilter(value: unknown) {
    if (!value) return undefined

    return { startsWith: value as string, mode: 'insensitive' as QueryMode }
  }

  async create(data: Prisma.ActivityAreaUncheckedCreateInput) {
    const activityArea = await this.dbContext.client.activityArea.create({
      data,
    })
    return activityArea
  }

  async findById(id: number) {
    const area = await this.dbContext.client.activityArea.findUnique({
      where: { id },
    })
    return area
  }

  async listAllActivityAreas(query?: ListAllActivityAreasQuery) {
    const orderBy: Prisma.ActivityAreaOrderByWithRelationInput[] = [
      { type: 'asc' as OrderableType },
      { area: 'asc' as OrderableType },
      { id: 'asc' as OrderableType },
    ]

    if (!query) {
      const activityAreas = await this.dbContext.client.activityArea.findMany({ orderBy })

      return {
        data: activityAreas,
        meta: {
          totalItems: activityAreas.length,
          totalPages: 1,
          currentPage: 1,
          pageSize: activityAreas.length,
        },
      }
    }

    const { limit: take, offset: skip } = evalOffset({ page: query.page, limit: query.limit })

    const where: Prisma.ActivityAreaWhereInput = {
      area: PrismaActivityAreasRepository.buildStartsWithFilter(query.name),
      type: query.type,
    }

    const [countResult, activityAreas] = await Promise.all([
      this.dbContext.client.activityArea.count({ where }),
      this.dbContext.client.activityArea.findMany({
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
      data: activityAreas,
      meta: {
        totalItems,
        totalPages,
        currentPage: query.page,
        pageSize,
      },
    }
  }

  async findByArea({ area, type }: ActivityAreaQuery) {
    const activityArea = await this.dbContext.client.activityArea.findUnique({
      where: {
        type_area: {
          area,
          type,
        },
      },
    })
    return activityArea
  }

  async findManyBy(areas: ActivityAreaQuery[]) {
    const activityAreas = await this.dbContext.client.activityArea.findMany({
      where: { OR: areas },
      orderBy: [{ type: 'asc' }, { area: 'asc' }, { id: 'asc' }],
    })
    return activityAreas
  }

  async delete(id: number) {
    await this.dbContext.client.activityArea.delete({
      where: { id },
    })
  }
}
