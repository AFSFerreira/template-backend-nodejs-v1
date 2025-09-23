import type { UsersRepository } from '@repositories/users-repository'
import { exportUsersAsCsv } from '@services/export-users'
import { EmptyUsersInfoError } from '../errors/user/empty-users-info-error'

// interface ExportUsersDataUseCaseRequest {}

interface ExportUsersDataUseCaseResponse {
  usersCSVInfo: string
}

export class ExportUsersDataUseCase {
  constructor(private readonly usersRepository: UsersRepository) {}

  async execute(): Promise<ExportUsersDataUseCaseResponse> {
    const allUsersInfo = await this.usersRepository.listAllUsers()

    if (allUsersInfo.length <= 0) {
      throw new EmptyUsersInfoError()
    }

    const usersCSVInfo = exportUsersAsCsv(allUsersInfo)

    return { usersCSVInfo }
  }
}
