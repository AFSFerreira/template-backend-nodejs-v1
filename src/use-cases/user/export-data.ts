import type { UsersRepository } from '@/repositories/users-repository'
import { exportUsersAsCsv } from '@/services/export-users'
import { EmptyUsersInfoException } from '../errors/empty-users-info-exception'

// interface ExportUsersUseCaseRequest {}

interface ExportUsersUseCaseResponse {
  usersCSVInfo: string
}

export class ExportUsersUseCase {
  constructor(private readonly usersRepository: UsersRepository) {}

  async execute(): Promise<ExportUsersUseCaseResponse> {
    const allUsersInfo = await this.usersRepository.listAllUsers()

    if (allUsersInfo.length <= 0) {
      throw new EmptyUsersInfoException()
    }

    const usersCSVInfo = exportUsersAsCsv(allUsersInfo)

    return { usersCSVInfo }
  }
}
