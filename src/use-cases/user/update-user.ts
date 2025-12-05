import type { UpdateUserQuery } from '@custom-types/repositories/user/update-user-query'
import type { UpdateUserUseCaseRequest, UpdateUserUseCaseResponse } from '@custom-types/use-cases/user/update-user'
import { env } from '@env/index'
import { logger } from '@lib/logger'
import { USER_UPDATE_SUCCESSFUL } from '@messages/loggings'
import { ActivityAreaType } from '@prisma/client'
import type { ActivityAreasRepository } from '@repositories/activity-areas-repository'
import type { AddressCountryRepository } from '@repositories/address-countries-repository'
import type { AddressStatesRepository } from '@repositories/address-states-repository'
import type { InstitutionsRepository } from '@repositories/institutions-repository'
import type { UsersRepository } from '@repositories/users-repository'
import { getAllInstitutions } from '@services/get-all-institutions'
import { validateActivityAreas } from '@services/validate-activity-areas'
import { InvalidInstitutionName } from '@use-cases/errors/user/invalid-institution-name-error'
import { UserWithSameEmail } from '@use-cases/errors/user/user-with-same-email-error'
import { UserWithSameUsername } from '@use-cases/errors/user/user-with-same-username-error'
import { ensureExists } from '@utils/guards/ensure'
import { hash } from 'bcryptjs'
import { UserNotFoundError } from '../errors/user/user-not-found-error'

export class UpdateUserUseCase {
  constructor(
    private readonly usersRepository: UsersRepository,
    private readonly activityAreasRepository: ActivityAreasRepository,
    private readonly institutionsRepository: InstitutionsRepository,
    private readonly addressStatesRepository: AddressStatesRepository,
    private readonly addressCountriesRepository: AddressCountryRepository,
  ) {}

  async execute({ publicId, data }: UpdateUserUseCaseRequest): Promise<UpdateUserUseCaseResponse> {
    const userExists = ensureExists({
      value: await this.usersRepository.findByPublicId(publicId),
      error: new UserNotFoundError(),
    })

    let userUpdateInfo: UpdateUserQuery['data']['user'] | undefined = undefined

    let addressUpdateInfo: UpdateUserQuery['data']['address'] | undefined = undefined

    if (data.user) {
      if (
        (data.user.email || data.user.username) &&
        (data.user.email !== userExists.email || data.user.username !== userExists.username)
      ) {
        const userConflictingUpdateInfo = await this.usersRepository.findConflictingUser({
          email: data.user.email,
          username: data.user.username,
        })

        if (userConflictingUpdateInfo.email === data.user.email) {
          throw new UserWithSameEmail()
        }

        if (userConflictingUpdateInfo.username === data.user.username) {
          throw new UserWithSameUsername()
        }
      }

      const { password, ...filteredUserUpdateData } = data.user

      const passwordHash = data.user.password
        ? await hash(data.user.password, env.HASH_SALT_ROUNDS)
        : userExists.passwordHash

      userUpdateInfo = {
        ...filteredUserUpdateData,
        passwordHash,
      }
    }

    if (data.address) {
      const addressCountry = await this.addressCountriesRepository.findOrCreate(data.address.country)

      const addressState = await this.addressStatesRepository.findOrCreate({
        state: data.address.state,
        countryId: addressCountry.id,
      })

      const { state, country, ...filteredAddressUpdateData } = data.address

      addressUpdateInfo = {
        ...filteredAddressUpdateData,
        stateId: addressState.id,
      }
    }

    if (data.academicPublication) {
      const academicPublicationsActivityAreas = data.academicPublication.map((academicPub) => ({
        area: academicPub.area,
        type: ActivityAreaType.SUB_AREA_OF_ACTIVITY,
      }))

      const activityAreas = [
        ...academicPublicationsActivityAreas,
        ...(data.activityArea
          ? [
              {
                area: data.activityArea.mainActivityArea,
                type: ActivityAreaType.AREA_OF_ACTIVITY,
              },
              {
                area: data.activityArea.subActivityArea,
                type: ActivityAreaType.SUB_AREA_OF_ACTIVITY,
              },
            ]
          : []),
      ]

      await validateActivityAreas({
        activityAreas,
        activityAreasRepository: this.activityAreasRepository,
      })
    }

    if (data.institution.name) {
      const institutionsNames = await getAllInstitutions({
        institutionsRepository: this.institutionsRepository,
        query: {
          name: data.institution.name,
          limit: Number.MAX_SAFE_INTEGER,
        },
      })

      if (!institutionsNames.includes(data.institution.name)) {
        throw new InvalidInstitutionName()
      }
    }

    const updatedUser = await this.usersRepository.update({
      id: userExists.id,
      data: {
        ...data,
        address: addressUpdateInfo,
        user: userUpdateInfo,
      },
    })

    logger.info({ publicId }, USER_UPDATE_SUCCESSFUL)

    return { user: updatedUser }
  }
}
