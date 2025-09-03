import { PrismaUsersRepository } from '@repositories/prisma/prisma-users-repository'
import { ExportUsersDataUseCase } from '@use-cases/user/export-users-data'

export function makeExportUsersDataUseCase() {
  const usersRepository = new PrismaUsersRepository()
  const exportUsersDataUseCase = new ExportUsersDataUseCase(usersRepository)

  return exportUsersDataUseCase
}
