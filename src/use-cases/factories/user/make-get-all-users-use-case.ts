import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repository'
import { GetAllUsersUseCase } from '@/use-cases/user/get-all-users'

export function makeGetAllUsersUseCase() {
  const usersRepository = new PrismaUsersRepository()
  const getAllusersUseCase = new GetAllUsersUseCase(usersRepository)

  return getAllusersUseCase
}
