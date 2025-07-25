import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repository'
import { FindByIdUseCase } from '@/use-cases/user/find-by-id'

export function makeFindByIdUseCase() {
  const usersRepository = new PrismaUsersRepository()
  const findByIdUseCase = new FindByIdUseCase(usersRepository)
  return findByIdUseCase
}
