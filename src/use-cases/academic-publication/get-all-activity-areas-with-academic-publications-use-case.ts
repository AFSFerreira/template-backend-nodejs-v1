import type {
  GetAllActivityAreasWithAcademicPublicationsUseCaseRequest,
  GetAllActivityAreasWithAcademicPublicationsUseCaseResponse,
} from '@custom-types/use-cases/academic-publication/get-all-activity-areas-with-academic-publications'
import type { ActivityAreasRepository } from '@repositories/activity-areas-repository'
import { tsyringeTokens } from '@lib/tsyringe/helpers/tokens'
import { inject, injectable } from 'tsyringe'

@injectable()
export class GetAllActivityAreasWithAcademicPublicationsUseCase {
  constructor(
    @inject(tsyringeTokens.repositories.activityAreas)
    private readonly activityAreasRepository: ActivityAreasRepository,
  ) {}

  async execute(
    getAllActivityAreasWithAcademicPublicationsUseCaseInput: GetAllActivityAreasWithAcademicPublicationsUseCaseRequest,
  ): Promise<GetAllActivityAreasWithAcademicPublicationsUseCaseResponse> {
    const activityAreasInfo = await this.activityAreasRepository.listAllActivityAreasWithAcademicPublicationsCount(
      getAllActivityAreasWithAcademicPublicationsUseCaseInput,
    )

    return activityAreasInfo
  }
}
