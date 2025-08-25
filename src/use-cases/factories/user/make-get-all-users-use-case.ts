import { PrismaUsersRepository } from '@repositories/prisma/prisma-users-repository'
import type { UsersRepository } from '@repositories/users-repository'
import { GetAllUsersUseCase } from '@use-cases/user/get-all-users'

export function makeGetAllUsersUseCase() {
  const usersRepository = new PrismaUsersRepository()
  const getAllusersUseCase = new GetAllUsersUseCase(
    usersRepository as UsersRepository,
  )

  return getAllusersUseCase
}
