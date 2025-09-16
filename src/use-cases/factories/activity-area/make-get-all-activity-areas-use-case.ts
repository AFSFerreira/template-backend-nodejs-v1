import { PrismaActivityAreaRepository } from '@repositories/prisma/prisma-activity-area-repository'
import { GetAllActivityAreasUseCase } from '@use-cases/activity-area/get-all-activity-areas-use-uase'

export function makeGetAllActivityAreasUseCase() {
  const activityAreaRepository = new PrismaActivityAreaRepository()
  const getAllActivityAreasUseCase = new GetAllActivityAreasUseCase(activityAreaRepository)

  return getAllActivityAreasUseCase
}
