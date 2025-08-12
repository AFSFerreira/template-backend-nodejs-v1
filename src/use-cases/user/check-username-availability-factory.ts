import { CheckUsernameAvailabilityUseCase } from './check-username-availability'
import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repository'

export function makeCheckUsernameAvailabilityUseCase() {
  const usersRepository = new PrismaUsersRepository()
  return new CheckUsernameAvailabilityUseCase(usersRepository)
}
