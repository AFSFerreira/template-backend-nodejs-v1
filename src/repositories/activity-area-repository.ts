import type { PaginationType } from '@custom-types/pagination-type'
import type { ActivityArea, ActivityAreaType, Prisma } from '@prisma/client'
import type { getAllActivityAreasSchemaType } from '@schemas/activity-area/get-all-activity-areas-schema'

export interface ActivityAreaQuery {
  area: string
  type: ActivityAreaType
}

export type ListAllActivityAreasQuery = Omit<
  getAllActivityAreasSchemaType,
  'page' | 'limit'
> &
  PaginationType

export interface ListAllActivityAreasResponse {
  activityAreas: ActivityArea[]
  totalItems: number
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
  listAllActivityAreas: (
    query?: ListAllActivityAreasQuery,
  ) => Promise<ListAllActivityAreasResponse>
  findManyByArea: (areas: ActivityAreaQuery[]) => Promise<ActivityArea[]>
  delete: (id: number) => Promise<void>
}
