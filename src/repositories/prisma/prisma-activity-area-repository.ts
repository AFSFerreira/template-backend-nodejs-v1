import type { QueryMode } from '@custom-types/query-mode'
import { prisma } from '@lib/prisma'
import type { Prisma } from '@prisma/client'
import type {
  ActivityAreaQuery,
  ActivityAreaRepository,
  ListAllActivityAreasQuery,
} from '../activity-area-repository'

export class PrismaActivityAreaRepository implements ActivityAreaRepository {
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
    if (!query?.page || !query?.limit) {
      const activityAreas = await prisma.activityArea.findMany({
        where: {
          area: PrismaActivityAreaRepository.buildStartsWithFilter(query?.name),
          type: query?.type,
        },
      })
      return { activityAreas, totalItems: activityAreas.length }
    }

    const offset = (query.page - 1) * query.limit

    const [totalItems, activityAreas] = await prisma.$transaction([
      prisma.activityArea.count({ where: { type: query.type } }),
      prisma.activityArea.findMany({
        skip: offset,
        take: query.limit,
        where: {
          area: PrismaActivityAreaRepository.buildStartsWithFilter(query.name),
          type: query.type,
        },
      }),
    ])

    return { activityAreas, totalItems }
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
