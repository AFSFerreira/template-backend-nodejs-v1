import { PrismaUsersRepository } from '@repositories/prisma/prisma-users-repository'
import { GetAllUsersDetailedUseCase } from '@use-cases/user/get-all-users-detailed'

export function makeGetAllUsersDetailedUseCase() {
  const usersRepository = new PrismaUsersRepository()
  const getAllUsersDetailedUseCase = new GetAllUsersDetailedUseCase(
    usersRepository,
  )

  return getAllUsersDetailedUseCase
}
