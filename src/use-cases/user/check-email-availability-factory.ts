import { CheckEmailAvailabilityUseCase } from './check-email-availability'
import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repository'

export function makeCheckEmailAvailabilityUseCase() {
  const usersRepository = new PrismaUsersRepository()
  return new CheckEmailAvailabilityUseCase(usersRepository)
}
