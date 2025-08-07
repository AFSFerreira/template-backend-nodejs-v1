import type { ActivityArea, ActivityAreaType, Prisma } from '@prisma/client'

export interface ActivityAreaRepository {
  create: (
    data: Prisma.ActivityAreaUncheckedCreateInput,
  ) => Promise<ActivityArea>
  findById: (id: number) => Promise<ActivityArea | null>
  findByArea: (
    area: string,
    type: ActivityAreaType,
  ) => Promise<ActivityArea | null>
  delete: (id: number) => Promise<void>
}
