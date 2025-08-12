import type { Prisma } from '@prisma/client'
import type {
  ActivityAreaQuery,
  ActivityAreaRepository,
} from '../activity-area-repository'
import { prisma } from '@/lib/prisma'

export class PrismaActivityAreaRepository implements ActivityAreaRepository {
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
