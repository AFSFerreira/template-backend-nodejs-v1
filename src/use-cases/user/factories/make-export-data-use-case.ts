import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repository'
import { ExportUsersUseCase } from '../export-data'

export function makeExportDataUseCase() {
  const usersRepository = new PrismaUsersRepository()
  const exportDataUseCase = new ExportUsersUseCase(usersRepository)
  return exportDataUseCase
}
