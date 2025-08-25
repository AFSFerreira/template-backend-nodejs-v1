import { PrismaUsersRepository } from '@repositories/prisma/prisma-users-repository'
import { CheckUsernameAvailabilityUseCase } from './check-username-availability'

export function makeCheckUsernameAvailabilityUseCase() {
  const usersRepository = new PrismaUsersRepository()
  return new CheckUsernameAvailabilityUseCase(usersRepository)
}
