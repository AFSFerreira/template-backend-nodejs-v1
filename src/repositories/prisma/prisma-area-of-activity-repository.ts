import type { Prisma } from '@prisma/client'
import { prisma } from '../../lib/prisma'
import type { AreaOfActivityRepository } from '../area-of-activity-repository'

export class PrismaAreaOfActivityRepository
  implements AreaOfActivityRepository
{
  async create(data: Prisma.AreaOfActivityCreateInput) {
    const areaOfActivity = await prisma.areaOfActivity.create({ data })
    return areaOfActivity
  }

  async findBy(where: Prisma.AreaOfActivityWhereInput) {
    const areaOfActivity = await prisma.areaOfActivity.findFirst({
      where,
    })
    return areaOfActivity
  }

  async delete(id: string) {
    await prisma.areaOfActivity.delete({ where: { id } })
  }

  async update(id: string, data: Prisma.AreaOfActivityUpdateInput) {
    const areaOfActivity = await prisma.areaOfActivity.update({
      where: { id },
      data,
    })
    return areaOfActivity
  }
}
