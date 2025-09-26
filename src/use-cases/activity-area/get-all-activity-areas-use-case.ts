import type { PaginationMetaType } from '@custom-types/pagination-meta-type'
import type { ActivityArea } from '@prisma/client'
import type { ActivityAreasRepository } from '@repositories/activity-areas-repository'
import type { getAllActivityAreasSchemaType } from '@schemas/activity-area/get-all-activity-areas-schema'

export type GetAllActivityAreasUseCaseRequest = getAllActivityAreasSchemaType

export interface GetAllActivityAreasUseCaseResponse {
  data: ActivityArea[]
  meta: PaginationMetaType
}

export class GetAllActivityAreasUseCase {
  constructor(private readonly ActivityAreasRepository: ActivityAreasRepository) {}

  async execute(
    getAllActivityAreasUseCaseInput: GetAllActivityAreasUseCaseRequest,
  ): Promise<GetAllActivityAreasUseCaseResponse> {
    const activityAreasInfo = await this.ActivityAreasRepository.listAllActivityAreas(getAllActivityAreasUseCaseInput)

    return activityAreasInfo
  }
}
