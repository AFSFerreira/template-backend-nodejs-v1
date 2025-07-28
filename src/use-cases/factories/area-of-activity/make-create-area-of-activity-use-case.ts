import { PrismaAreaOfActivityRepository } from '@/repositories/prisma/prisma-area-of-activity-repository'
import { CreateAreaOfActivityUseCase } from '@/use-cases/area-of-activity/create-area-of-activity-use-case'

export function makeCreateAreaOfActivityUseCase() {
  const areaOfActivityRepository = new PrismaAreaOfActivityRepository()
  return new CreateAreaOfActivityUseCase(areaOfActivityRepository)
}
