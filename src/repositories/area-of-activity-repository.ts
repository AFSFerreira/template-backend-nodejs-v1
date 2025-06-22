import type { AreaOfActivity, Prisma } from '@prisma/client'

export interface AreaOfActivityRepository {
  create: (data: Prisma.AreaOfActivityCreateInput) => Promise<AreaOfActivity>
  findById: (id: string) => Promise<AreaOfActivity | null>
  findByMainAreaActivity: (
    mainAreaActivity: string,
  ) => Promise<AreaOfActivity | null>
  delete: (id: string) => Promise<void>
  update: (
    id: string,
    data: Prisma.AreaOfActivityUpdateInput,
  ) => Promise<AreaOfActivity>
}
