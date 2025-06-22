import { PrismaAreaOfActivityRepository } from '@/repositories/prisma/prisma-area-of-activity-repository'
import { CreateAreaOfActivityUseCase } from '../create-area-of-activity'

export function makeCreateAreaOfActivityUseCase() {
  const areaOfActivityRepository = new PrismaAreaOfActivityRepository()
  return new CreateAreaOfActivityUseCase(areaOfActivityRepository)
}
