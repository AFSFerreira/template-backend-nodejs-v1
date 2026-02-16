import type { PaginatedResult } from '@custom-types/custom/pagination-meta-type'
import type { ActivityAreasAcademicPublicationsCount } from '@custom-types/repository/prisma/academic-publication/activity-areas-academic-publications-count'
import type { ListAllActivityAreasWithAcademicPublicationsQuery } from '@custom-types/repository/prisma/academic-publication/list-all-activity-areas-with-academic-publications-query'
import type { ActivityAreaQuery } from '@custom-types/repository/prisma/activity-area/activity-area-query'
import type { ActivityAreasBlogsCount } from '@custom-types/repository/prisma/activity-area/activity-areas-blogs-count'
import type { ListAllActivityAreasQuery } from '@custom-types/repository/prisma/activity-area/list-all-activity-areas-query'
import type { ListAllActivityAreasWithBlogsQuery } from '@custom-types/repository/prisma/activity-area/list-all-activity-areas-with-blogs-query'
import type { ActivityArea, Prisma } from '@prisma/generated/client'

export interface ActivityAreasRepository {
  create: (data: Prisma.ActivityAreaUncheckedCreateInput) => Promise<ActivityArea>
  findById: (id: number) => Promise<ActivityArea | null>
  findByArea: (query: ActivityAreaQuery) => Promise<ActivityArea | null>
  listAllActivityAreas: (query: ListAllActivityAreasQuery) => Promise<PaginatedResult<ActivityArea[]>>
  listAllActivityAreasWithBlogsCount: (
    query: ListAllActivityAreasWithBlogsQuery,
  ) => Promise<PaginatedResult<ActivityAreasBlogsCount[]>>
  listAllActivityAreasWithAcademicPublicationsCount: (
    query: ListAllActivityAreasWithAcademicPublicationsQuery,
  ) => Promise<PaginatedResult<ActivityAreasAcademicPublicationsCount[]>>
  findManyBy: (areas: ActivityAreaQuery[]) => Promise<ActivityArea[]>
  delete: (id: number) => Promise<void>
}
