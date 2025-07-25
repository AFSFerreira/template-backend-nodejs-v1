import { CreateAreaOfActivityUseCase } from '../create-area-of-activity-use-case'
import { PrismaAreaOfActivityRepository } from '@/repositories/prisma/prisma-area-of-activity-repository'

export function makeCreateAreaOfActivityUseCase() {
  const areaOfActivityRepository = new PrismaAreaOfActivityRepository()
  return new CreateAreaOfActivityUseCase(areaOfActivityRepository)
}
