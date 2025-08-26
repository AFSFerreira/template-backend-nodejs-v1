import { PrismaUsersRepository } from '@repositories/prisma/prisma-users-repository'
import { GetAllUsersSimplifiedUseCase } from '@use-cases/user/get-all-users-simplified'

export function makeGetAllUsersSimplifiedUseCase() {
  const usersRepository = new PrismaUsersRepository()
  const getAllUsersSimplifiedUseCase = new GetAllUsersSimplifiedUseCase(
    usersRepository,
  )

  return getAllUsersSimplifiedUseCase
}
