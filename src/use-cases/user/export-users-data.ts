import { Readable } from 'node:stream'
import type { ExportUsersDataUseCaseResponse } from '@custom-types/use-cases/user/export-users-data'
import type { UserWithDetails } from '@custom-types/validator/user-with-details'
import { logger } from '@lib/logger'
import { tokens } from '@lib/tsyringe/helpers/tokens'
import { ALL_USERS_INFO_EXPORTED } from '@messages/loggings'
import type { UsersRepository } from '@repositories/users-repository'
import { flattenUser } from '@services/flatten-user'
import { Transform } from 'json2csv'
import { inject, injectable } from 'tsyringe'

@injectable()
export class ExportUsersDataUseCase {
  constructor(
    @inject(tokens.repositories.users)
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
