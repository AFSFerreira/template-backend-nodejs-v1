import { PrismaUsersRepository } from '@repositories/prisma/prisma-users-repository'
import { CheckAvailabilityUseCase } from '../../user/check-availability'

export function makeCheckAvailabilityUseCase() {
  const usersRepository = new PrismaUsersRepository()
  return new CheckAvailabilityUseCase(usersRepository)
}
