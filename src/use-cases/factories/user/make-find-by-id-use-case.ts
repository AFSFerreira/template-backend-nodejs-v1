import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repository'
import { FindUserByIdUseCase } from '@/use-cases/user/find-by-id'

export function makeFindUserByIdUseCase() {
  const usersRepository = new PrismaUsersRepository()
  const findByIdUseCase = new FindUserByIdUseCase(usersRepository)
  return findByIdUseCase
}
