import { PrismaUsersRepository } from '@repositories/prisma/prisma-users-repository'
import { GetAllUsersRestrictedUseCase } from '@use-cases/user/get-all-users-restricted'

export function makeGetAllUsersRestrictedUseCase() {
  const usersRepository = new PrismaUsersRepository()
  const getAllUsersRestrictedUseCase = new GetAllUsersRestrictedUseCase(
    usersRepository,
  )

  return getAllUsersRestrictedUseCase
}
