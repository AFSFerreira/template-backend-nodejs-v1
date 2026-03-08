import type { PassThrough } from 'node:stream'
import type {
  ExportUsersDataUseCaseRequest,
  ExportUsersDataUseCaseResponse,
} from '@custom-types/use-cases/user/export-users-data'
import type { UsersRepository } from '@repositories/users-repository'
import { UnreachableCaseError } from '@errors/unreachable-case-error'
import { logger } from '@lib/pino'
import { tsyringeTokens } from '@lib/tsyringe/helpers/tokens'
import { ALL_USERS_INFO_EXPORTED } from '@messages/loggings/models/user-loggings'
import { MembershipStatusType } from '@prisma/generated/enums'
import { CsvExportService } from '@services/exporters/csv-export-service'
import { ExcelExportService } from '@services/exporters/excel-export-service'
import { generateTimestamp } from '@utils/dates/generate-timestamp'
import { inject, injectable } from 'tsyringe'

@injectable()
export class ExportUsersDataUseCase {
  constructor(
    @inject(tsyringeTokens.repositories.users)
    private readonly usersRepository: UsersRepository,
  ) {}

  async execute({ format }: ExportUsersDataUseCaseRequest): Promise<ExportUsersDataUseCaseResponse> {
    const usersStream = this.usersRepository.streamAllUsers({
      where: {
        membershipStatus: [MembershipStatusType.ACTIVE, MembershipStatusType.INACTIVE],
      },
    })

    let reportStream: PassThrough

    switch (format) {
      case 'xlsx': {
        reportStream = new ExcelExportService().generateUsersReport(usersStream)
        break
      }
      case 'csv': {
        reportStream = new CsvExportService().generateUsersReport(usersStream)
        break
      }
      default: {
        throw new UnreachableCaseError(format satisfies never)
      }
    }

    const filename = `usuarios_${generateTimestamp()}.${format}`

    logger.info(ALL_USERS_INFO_EXPORTED)

    return { reportStream, filename }
  }
}
