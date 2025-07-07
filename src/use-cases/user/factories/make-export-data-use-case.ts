import { PrismaUsersRepository } from "@/repositories/prisma/prisma-users-repository"
import { ExportDataUseCase } from "../export-data"

export function makeExportDataUseCase() {
    const usersRepository = new PrismaUsersRepository()
    
    const exportDataUseCase = new ExportDataUseCase(usersRepository)

    return exportDataUseCase
}
