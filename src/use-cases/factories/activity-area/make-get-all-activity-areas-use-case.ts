import { PrismaActivityAreasRepository } from '@repositories/prisma/prisma-activity-area-repository'
import { GetAllActivityAreasUseCase } from '@use-cases/activity-area/get-all-activity-areas-use-case'

export function makeGetAllActivityAreasUseCase() {
  const ActivityAreasRepository = new PrismaActivityAreasRepository()
  const getAllActivityAreasUseCase = new GetAllActivityAreasUseCase(ActivityAreasRepository)

  return getAllActivityAreasUseCase
}
