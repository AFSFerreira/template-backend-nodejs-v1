import type { ExportUsersDataUseCaseResponse } from '@custom-types/use-cases/user/export-users-data'
import type { UserWithDetails } from '@custom-types/validators/user-with-details'
import type { UsersRepository } from '@repositories/users-repository'
import { Readable } from 'node:stream'
import { logger } from '@lib/pino'
import { tsyringeTokens } from '@lib/tsyringe/helpers/tokens'
import { ALL_USERS_INFO_EXPORTED } from '@messages/loggings/models/user-loggings'
import { flattenUser } from '@services/formatters/flatten-user'
import { Transform } from 'json2csv'
import { inject, injectable } from 'tsyringe'

@injectable()
export class ExportUsersDataUseCase {
  constructor(
    @inject(tsyringeTokens.repositories.users)
    private readonly usersRepository: UsersRepository,
  ) {}

  async execute(): Promise<ExportUsersDataUseCaseResponse> {
    const usersGenerator = this.usersRepository.streamAllUsers()

    const sourceStream = Readable.from(usersGenerator)

    const csvTransform = new Transform(
      {
        header: true,
        transforms: [(item) => flattenUser(item)],
      },
      { objectMode: true },
    )

    logger.info(ALL_USERS_INFO_EXPORTED)

    return { usersCSVInfo: sourceStream.pipe<Transform<UserWithDetails>>(csvTransform) }
  }
}
