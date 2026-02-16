import type { PaginatedResult } from '@custom-types/custom/pagination-meta-type'
import type { GetAllActivityAreasWithAcademicPublicationsQuerySchemaType } from '@custom-types/http/schemas/academic-publication/get-all-activity-areas-with-academic-publications-query-schema'
import type { ActivityAreasAcademicPublicationsCount } from '@custom-types/repository/prisma/academic-publication/activity-areas-academic-publications-count'

export interface GetAllActivityAreasWithAcademicPublicationsUseCaseRequest
  extends GetAllActivityAreasWithAcademicPublicationsQuerySchemaType {}

export interface GetAllActivityAreasWithAcademicPublicationsUseCaseResponse
  extends PaginatedResult<ActivityAreasAcademicPublicationsCount[]> {}
