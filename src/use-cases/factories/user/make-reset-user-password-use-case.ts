import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repository'
import { ResetUserPasswordUseCase } from '@/use-cases/user/reset-user-password-use-case'

export function makeResetUserPasswordUseCase() {
  const usersRepository = new PrismaUsersRepository()
  const resetUserPasswordUseCase = new ResetUserPasswordUseCase(usersRepository)

  return resetUserPasswordUseCase
}
