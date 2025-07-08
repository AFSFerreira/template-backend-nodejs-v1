import type { UsersRepository } from '@/repositories/users-repository'
import { exportUsersAsCsv } from '@/services/export-users'
import { EmptyUsersInfoException } from '../errors/empty-users-info-exception'

// interface ExportUsersUseCaseRequest {}

interface ExportDataUseCaseResponse {
  userCSVInfo: string
}

export class ExportDataUseCase {
  constructor(private readonly usersRepository: UsersRepository) {}

  async execute(): Promise<ExportDataUseCaseResponse> {
    const allUsersInfo = await this.usersRepository.listAllUsersInfo()

    if (allUsersInfo.length === 0) {
      throw new EmptyUsersInfoException()
    }

    const userCSVInfo = exportUsersAsCsv(allUsersInfo)

    return { userCSVInfo }
  }
}
