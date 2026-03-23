import type { UpdateUserQuery } from '@custom-types/repository/prisma/user/update-user-query'
import type { UpdateUserUseCaseRequest, UpdateUserUseCaseResponse } from '@custom-types/use-cases/user/update-user'
import type { UsersRepository } from '@repositories/users-repository'
import { logger } from '@lib/pino'
import { tsyringeTokens } from '@lib/tsyringe/helpers/tokens'
import { USER_UPDATE_SUCCESSFUL } from '@messages/loggings/models/user-loggings'
import { MxRecordValidationService } from '@services/validators/validate-mx-record'
import { InvalidEmailDomainError } from '@use-cases/errors/user/invalid-email-domain-error'
import { UserWithSameEmail } from '@use-cases/errors/user/user-with-same-email-error'
import { UserWithSameUsername } from '@use-cases/errors/user/user-with-same-username-error'
import { ensureExists } from '@utils/validators/ensure'
import { inject, singleton } from 'tsyringe'
import { UserNotFoundError } from '../errors/user/user-not-found-error'

@singleton()
export class UpdateUserUseCase {
  constructor(
    @inject(tsyringeTokens.repositories.users)
    private readonly usersRepository: UsersRepository,

    @inject(MxRecordValidationService)
    private readonly mxRecordValidationService: MxRecordValidationService,
  ) {}

  async execute({ id, data }: UpdateUserUseCaseRequest): Promise<UpdateUserUseCaseResponse> {
    const userExists = ensureExists({
      value: await this.usersRepository.findById(id),
      error: new UserNotFoundError(),
    })

    const userUpdateInfo: UpdateUserQuery['data'] = {}

    if (data.username && data.username !== userExists.username) {
      const userConflictingUpdateInfo = await this.usersRepository.findByUsername(data.username)

      if (userConflictingUpdateInfo) {
        throw new UserWithSameUsername()
      }

      userUpdateInfo.username = data.username
    }

    if (data.email && data.email !== userExists.email) {
      const isValidEmailDomain = await this.mxRecordValidationService.validate(data.email)

      if (!isValidEmailDomain) {
        throw new InvalidEmailDomainError()
      }

      const userConflictingUpdateInfo = await this.usersRepository.findByEmail(data.email)

      if (userConflictingUpdateInfo) {
        throw new UserWithSameEmail()
      }

      userUpdateInfo.email = data.email
    }

    const shouldUpdate = Object.keys(userUpdateInfo).length > 0

    const user = shouldUpdate
      ? await this.usersRepository.update({
          id: userExists.id,
          data,
        })
      : userExists

    logger.info({ id }, USER_UPDATE_SUCCESSFUL)

    return { user }
  }
}
