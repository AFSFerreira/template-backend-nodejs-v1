import type { AreaOfActivity } from '@prisma/client'
import type { AreaOfActivityRepository } from '@/repositories/area-of-activity-repository'

interface CreateAreaOfActivityUseCaseRequest {
  mainAreaActivity: string
}

interface CreateAreaOfActivityUseCaseResponse {
  areaOfActivity: AreaOfActivity
}

export class CreateAreaOfActivityUseCase {
  constructor(
    private readonly areaOfActivityRepository: AreaOfActivityRepository,
  ) {}

  async execute({
    mainAreaActivity,
  }: CreateAreaOfActivityUseCaseRequest): Promise<CreateAreaOfActivityUseCaseResponse> {
    const areaOfActivity = await this.areaOfActivityRepository.create({
      mainAreaActivity,
    })

    return { areaOfActivity }
  }
}
