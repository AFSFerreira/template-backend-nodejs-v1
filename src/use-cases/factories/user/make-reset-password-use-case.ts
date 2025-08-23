import { PrismaUsersRepository } from '@repositories/prisma/prisma-users-repository'
import { ResetPasswordUseCase } from '@use-cases/user/reset-password-use-case'

export function makeResetPasswordUseCase() {
  const usersRepository = new PrismaUsersRepository()
  const resetUserPasswordUseCase = new ResetPasswordUseCase(usersRepository)

  return resetUserPasswordUseCase
}
