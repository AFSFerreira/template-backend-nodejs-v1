import { ExportUsersUseCase } from '../export-data'
import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repository'

export function makeExportDataUseCase() {
  const usersRepository = new PrismaUsersRepository()
  const exportDataUseCase = new ExportUsersUseCase(usersRepository)
  return exportDataUseCase
}
