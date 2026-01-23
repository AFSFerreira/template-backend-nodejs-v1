import type {
  GetAllActivityAreasUseCaseRequest,
  GetAllActivityAreasUseCaseResponse,
} from '@custom-types/use-cases/activity-area/get-all-activity-areas-use-case'
import type { ActivityAreasRepository } from '@repositories/activity-areas-repository'
import { tsyringeTokens } from '@lib/tsyringe/helpers/tokens'
import { inject, injectable } from 'tsyringe'

@injectable()
export class GetAllActivityAreasUseCase {
  constructor(
    @inject(tsyringeTokens.repositories.activityAreas)
    private readonly ActivityAreasRepository: ActivityAreasRepository,
  ) {}

  async execute(
    getAllActivityAreasUseCaseInput: GetAllActivityAreasUseCaseRequest,
  ): Promise<GetAllActivityAreasUseCaseResponse> {
    const activityAreasInfo = await this.ActivityAreasRepository.listAllActivityAreas(getAllActivityAreasUseCaseInput)

    return activityAreasInfo
  }
}
