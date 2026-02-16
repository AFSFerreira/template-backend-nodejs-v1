import type { OrderableType } from '@custom-types/custom/orderable'
import type { QueryMode } from '@custom-types/custom/query-mode'
import type { ActivityAreaQuery } from '@custom-types/repository/prisma/activity-area/activity-area-query'
import type { ListAllActivityAreasQuery } from '@custom-types/repository/prisma/activity-area/list-all-activity-areas-query'
import type { ListAllActivityAreasWithBlogsQuery } from '@custom-types/repository/prisma/activity-area/list-all-activity-areas-with-blogs-query'
import type { DatabaseContext } from '@lib/prisma/helpers/database-context'
import type { Prisma } from '@prisma/generated/client'
import type { ActivityAreasRepository } from '@repositories/activity-areas-repository'
import { tsyringeTokens } from '@lib/tsyringe/helpers/tokens'
import { ActivityAreaType, EditorialStatusType } from '@prisma/generated/client'
import { evalOffset } from '@utils/generics/eval-offset'
import { evalTotalPages } from '@utils/generics/eval-total-pages'
import { inject, injectable } from 'tsyringe'

@injectable()
export class PrismaActivityAreasRepository implements ActivityAreasRepository {
  constructor(
    @inject(tsyringeTokens.infra.database)
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

  async listAllActivityAreas(query: ListAllActivityAreasQuery) {
    const orderBy: Prisma.ActivityAreaOrderByWithRelationInput[] = [
      { type: 'asc' as OrderableType },
      { area: 'asc' as OrderableType },
      { id: 'asc' as OrderableType },
    ]

    const { page, limit } = query

    const { limit: take, offset: skip } = evalOffset({ page, limit })

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
        currentPage: page,
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

  async listAllActivityAreasWithBlogsCount(query: ListAllActivityAreasWithBlogsQuery) {
    const where: Prisma.ActivityAreaWhereInput = {
      type: ActivityAreaType.SUB_AREA_OF_ACTIVITY,
      BlogSubCategory: {
        some: {
          editorialStatus: EditorialStatusType.PUBLISHED,
        },
      },
    }

    const orderBy: Prisma.ActivityAreaOrderByWithRelationInput[] = [
      ...(query?.orderBy?.blogsCountOrder
        ? [
            {
              BlogSubCategory: { _count: query.orderBy.blogsCountOrder },
            },
          ]
        : []),
      { id: 'asc' },
    ]

    const include: Prisma.ActivityAreaInclude = {
      _count: {
        select: { BlogSubCategory: true },
      },
    }

    const { offset: skip, limit: take } = evalOffset({ page: query.page, limit: query.limit })

    const [countResult, activityAreas] = await Promise.all([
      this.dbContext.client.activityArea.count({ where }),
      this.dbContext.client.activityArea.findMany({
        where,
        skip,
        take,
        orderBy,
        include,
      }),
    ])

    const pageSize = query.limit
    const totalItems = countResult

    const totalPages = evalTotalPages({ pageSize, totalItems })

    return {
      data: activityAreas.map((activityArea) => ({
        area: activityArea.area,
        blogsCount: activityArea._count.BlogSubCategory,
      })),
      meta: {
        totalItems,
        totalPages,
        currentPage: query.page,
        pageSize,
      },
    }
  }

  async delete(id: number) {
    await this.dbContext.client.activityArea.delete({
      where: { id },
    })
  }
}
