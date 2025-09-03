import type { UserWithDetails } from '@custom-types/user-with-details'
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
    const { data: allUsersInfo } = await this.usersRepository.listAllUsers({
      simplified: false,
    })

    if (allUsersInfo.length <= 0) {
      throw new EmptyUsersInfoError()
    }

    const usersCSVInfo = exportUsersAsCsv(allUsersInfo as UserWithDetails[])

    return { usersCSVInfo }
  }
}
