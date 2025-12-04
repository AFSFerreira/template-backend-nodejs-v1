import { PrismaUsersRepository } from '@repositories/prisma/prisma-users-repository'
import { DeleteUserByAdminUseCase } from '@use-cases/user/delete-user-by-admin'

export function makeDeleteUserByAdminUseCase() {
  const usersRepository = new PrismaUsersRepository()
  const deleteUserByAdminUseCase = new DeleteUserByAdminUseCase(usersRepository)

  return deleteUserByAdminUseCase
}
