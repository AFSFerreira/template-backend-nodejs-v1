import type { PaginationMetaType } from '@custom-types/pagination-meta-type'
import type { ActivityArea } from '@prisma/client'
import type { ActivityAreaRepository } from '@repositories/activity-area-repository'
import type { getAllActivityAreasSchemaType } from '@schemas/activity-area/get-all-activity-areas-schema'

export type GetAllActivityAreasUseCaseRequest = getAllActivityAreasSchemaType

export interface GetAllActivityAreasUseCaseResponse {
  data: ActivityArea[]
  meta: PaginationMetaType
}

export class GetAllActivityAreasUseCase {
  constructor(private readonly activityAreaRepository: ActivityAreaRepository) {}

  async execute({
    name,
    type,
    page,
    limit,
  }: GetAllActivityAreasUseCaseRequest): Promise<GetAllActivityAreasUseCaseResponse> {
    const activityAreasInfo = await this.activityAreaRepository.listAllActivityAreas({
      name,
      type,
      page,
      limit,
    })

    return activityAreasInfo
  }
}
