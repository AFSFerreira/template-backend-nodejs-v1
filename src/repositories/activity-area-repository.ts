import type { ActivityArea, ActivityAreaType, Prisma } from '@prisma/client'

export interface ActivityAreaQuery {
  area: string
  type: ActivityAreaType
}

export interface ActivityAreaRepository {
  create: (
    data: Prisma.ActivityAreaUncheckedCreateInput,
  ) => Promise<ActivityArea>
  findById: (id: number) => Promise<ActivityArea | null>
  findByArea: ({
    area,
    type,
  }: ActivityAreaQuery) => Promise<ActivityArea | null>
  findManyByArea: (areas: ActivityAreaQuery[]) => Promise<ActivityArea[]>
  delete: (id: number) => Promise<void>
}
