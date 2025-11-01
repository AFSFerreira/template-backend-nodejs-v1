import type { OrderableType } from '@custom-types/orderable'
import type { QueryMode } from '@custom-types/query-mode'
import { prisma } from '@lib/prisma'
import type { Prisma } from '@prisma/client'
import { evalOffset } from '@utils/eval-offset'
import { evalTotalPages } from '@utils/eval-total-pages'
import type {
  ActivityAreaQuery,
  ActivityAreasRepository,
  ListAllActivityAreasQuery,
} from '../activity-areas-repository'

export class PrismaActivityAreasRepository implements ActivityAreasRepository {
  static buildStartsWithFilter(value: any) {
    if (!value) return undefined

    return { startsWith: value, mode: 'insensitive' as QueryMode }
  }

  async create(data: Prisma.ActivityAreaUncheckedCreateInput) {
    const activityArea = await prisma.activityArea.create({
      data,
    })
    return activityArea
  }

  async findById(id: number) {
    const area = await prisma.activityArea.findUnique({
      where: { id },
    })
    return area
  }

  async listAllActivityAreas(query?: ListAllActivityAreasQuery) {
    const orderBy = {
      type: 'asc' as OrderableType,
      area: 'asc' as OrderableType,
      id: 'asc' as OrderableType,
    }

    if (!query) {
      const activityAreas = await prisma.activityArea.findMany({ orderBy })

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

    const where = {
      area: PrismaActivityAreasRepository.buildStartsWithFilter(query.name),
      type: query.type,
    }

    const [countResult, activityAreas] = await Promise.all([
      prisma.activityArea.count({ where }),
      prisma.activityArea.findMany({
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
    const activityArea = await prisma.activityArea.findUnique({
      where: {
        type_area: {
          area,
          type,
        },
      },
    })
    return activityArea
  }

  async findManyByArea(areas: ActivityAreaQuery[]) {
    const activityAreas = await prisma.activityArea.findMany({
      where: {
        OR: areas,
      },
      orderBy: {
        type: 'asc',
        area: 'asc',
        id: 'asc',
      },
    })
    return activityAreas
  }

  async delete(id: number) {
    await prisma.activityArea.delete({
      where: {
        id,
      },
    })
  }
}
