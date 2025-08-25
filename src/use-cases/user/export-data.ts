import type { UsersRepository } from '@repositories/users-repository'
import { exportUsersAsCsv } from '@services/export-users'
import { EmptyUsersInfoError } from '../errors/empty-users-info-error'

// interface ExportUsersUseCaseRequest {}

interface ExportUsersUseCaseResponse {
  usersCSVInfo: string
}

export class ExportUsersUseCase {
  constructor(private readonly usersRepository: UsersRepository) {}

  async execute(): Promise<ExportUsersUseCaseResponse> {
    const { data: allUsersInfo } = await this.usersRepository.listAllUsers()

    if (allUsersInfo.length <= 0) {
      throw new EmptyUsersInfoError()
    }

    const usersCSVInfo = exportUsersAsCsv(allUsersInfo)

    return { usersCSVInfo }
  }
}
