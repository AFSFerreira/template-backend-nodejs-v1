import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repository'
import { FindUserByPublicIdUseCase } from '@/use-cases/user/find-by-public-id'

export function makeFindUserByPublicIdUseCase() {
  const usersRepository = new PrismaUsersRepository()
  const findByPublicIdUseCase = new FindUserByPublicIdUseCase(usersRepository)
  return findByPublicIdUseCase
}
