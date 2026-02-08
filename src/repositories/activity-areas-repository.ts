import type { PaginatedResult } from '@custom-types/custom/pagination-meta-type'
import type { ActivityAreaQuery } from '@custom-types/repository/prisma/activity-area/activity-area-query'
import type { ListAllActivityAreasQuery } from '@custom-types/repository/prisma/activity-area/list-all-activity-areas-query'
import type { ActivityArea, Prisma } from '@prisma/generated/client'

export interface ActivityAreasRepository {
  create: (data: Prisma.ActivityAreaUncheckedCreateInput) => Promise<ActivityArea>
  findById: (id: number) => Promise<ActivityArea | null>
  findByArea: (query: ActivityAreaQuery) => Promise<ActivityArea | null>
  listAllActivityAreas: (query: ListAllActivityAreasQuery) => Promise<PaginatedResult<ActivityArea[]>>
  findManyBy: (areas: ActivityAreaQuery[]) => Promise<ActivityArea[]>
  delete: (id: number) => Promise<void>
}
