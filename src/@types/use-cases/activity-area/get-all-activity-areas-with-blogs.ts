import type { PaginatedResult } from '@custom-types/custom/pagination-meta-type'
import type { GetAllActivityAreasWithBlogsQuerySchemaType } from '@custom-types/http/schemas/activity-area/get-all-activity-areas-with-blogs-query-schema'
import type { ActivityAreasBlogsCount } from '@custom-types/repository/prisma/activity-area/activity-areas-blogs-count'

export interface GetAllActivityAreasWithBlogsUseCaseRequest extends GetAllActivityAreasWithBlogsQuerySchemaType {}

export interface GetAllActivityAreasWithBlogsUseCaseResponse extends PaginatedResult<ActivityAreasBlogsCount[]> {}
