import type { AreaOfActivity, Prisma } from '@prisma/client'

export interface AreaOfActivityRepository {
  create: (data: Prisma.AreaOfActivityCreateInput) => Promise<AreaOfActivity>
  findBy: (
    where: Prisma.AreaOfActivityWhereInput,
  ) => Promise<AreaOfActivity | null>
  delete: (id: string) => Promise<void>
  update: (
    id: string,
    data: Prisma.AreaOfActivityUpdateInput,
  ) => Promise<AreaOfActivity>
}
