import type { ExportUsersDataUseCaseResponse } from '@custom-types/use-cases/user/export-users-data'
import type { UsersRepository } from '@repositories/users-repository'
import { logger } from '@lib/pino'
import { tsyringeTokens } from '@lib/tsyringe/helpers/tokens'
import { ALL_USERS_INFO_EXPORTED } from '@messages/loggings/models/user-loggings'
import { CsvExportService } from '@services/exporters/csv-export-service'
import { inject, injectable } from 'tsyringe'

@injectable()
export class ExportUsersDataUseCase {
  constructor(
    @inject(tsyringeTokens.repositories.users)
    private readonly usersRepository: UsersRepository,
  ) {}

  async execute(): Promise<ExportUsersDataUseCaseResponse> {
    const usersStream = this.usersRepository.streamAllUsers()

    const usersCSVInfo = new CsvExportService().generateUsersReport(usersStream)

    logger.info(ALL_USERS_INFO_EXPORTED)

    return { usersCSVInfo }
  }
}
