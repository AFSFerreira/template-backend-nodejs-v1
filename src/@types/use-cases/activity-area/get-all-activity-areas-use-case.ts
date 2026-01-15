import type { PaginatedResult } from '@custom-types/custom/pagination-meta-type'
import type { GetAllActivityAreasSchemaType } from '@custom-types/http/schemas/activity-area/get-all-activity-areas-schema'
import type { ActivityArea } from '@prisma/client'

export interface GetAllActivityAreasUseCaseRequest extends GetAllActivityAreasSchemaType {}

export interface GetAllActivityAreasUseCaseResponse extends PaginatedResult<ActivityArea[]> {}
