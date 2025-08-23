import { PrismaUsersRepository } from '@repositories/prisma/prisma-users-repository'
import { CheckEmailAvailabilityUseCase } from './check-email-availability'

export function makeCheckEmailAvailabilityUseCase() {
  const usersRepository = new PrismaUsersRepository()
  return new CheckEmailAvailabilityUseCase(usersRepository)
}
