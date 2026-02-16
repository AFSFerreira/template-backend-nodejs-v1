import type {
  GetAllActivityAreasWithBlogsUseCaseRequest,
  GetAllActivityAreasWithBlogsUseCaseResponse,
} from '@custom-types/use-cases/activity-area/get-all-activity-areas-with-blogs'
import type { ActivityAreasRepository } from '@repositories/activity-areas-repository'
import { tsyringeTokens } from '@lib/tsyringe/helpers/tokens'
import { inject, injectable } from 'tsyringe'

@injectable()
export class GetAllActivityAreasWithBlogsUseCase {
  constructor(
    @inject(tsyringeTokens.repositories.activityAreas)
    private readonly activityAreasRepository: ActivityAreasRepository,
  ) {}

  async execute(
    getAllActivityAreasWithBlogsUseCaseInput: GetAllActivityAreasWithBlogsUseCaseRequest,
  ): Promise<GetAllActivityAreasWithBlogsUseCaseResponse> {
    const activityAreasInfo = await this.activityAreasRepository.listAllActivityAreasWithBlogsCount(
      getAllActivityAreasWithBlogsUseCaseInput,
    )

    return activityAreasInfo
  }
}
