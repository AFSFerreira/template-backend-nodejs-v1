import { PrismaUsersRepository } from '@repositories/prisma/prisma-users-repository'
import { DeleteUserUseCase } from '@use-cases/user/delete-user'

export function makeDeleteUserUseCase() {
  const usersRepository = new PrismaUsersRepository()
  const deleteUserAccountUseCase = new DeleteUserUseCase(usersRepository)

  return deleteUserAccountUseCase
}
