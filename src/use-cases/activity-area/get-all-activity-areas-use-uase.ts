import type { ActivityArea } from '@prisma/client'
import type { getAllActivityAreasSchemaType } from '@/http/schemas/activity-area/get-all-activity-areas-schema'
import type { ActivityAreaRepository } from '@/repositories/activity-area-repository'

export type GetAllActivityAreasUseCaseRequest = getAllActivityAreasSchemaType

export interface GetAllActivityAreasUseCaseResponse {
  activityAreas: ActivityArea[]
  totalItems: number
}

export class GetAllActivityAreasUseCase {
  constructor(
    private readonly activityAreaRepository: ActivityAreaRepository,
  ) {}

  async execute({
    name,
    type,
    page,
    limit,
  }: GetAllActivityAreasUseCaseRequest): Promise<GetAllActivityAreasUseCaseResponse> {
    const activityAreasInfo =
      await this.activityAreaRepository.listAllActivityAreas({
        name,
        type,
        page,
        limit,
      })

    return activityAreasInfo
  }
}
