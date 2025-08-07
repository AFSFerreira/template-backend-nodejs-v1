import type { ActivityAreaType, Prisma } from '@prisma/client'
import type { ActivityAreaRepository } from '../activity-area-repository'
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

  async findByArea(area: string, type: ActivityAreaType) {
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

  async delete(id: number) {
    await prisma.activityArea.delete({
      where: {
        id,
      },
    })
  }
}
