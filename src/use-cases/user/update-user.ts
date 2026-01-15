import type { UpdateUserQuery } from '@custom-types/repository/prisma/user/update-user-query'
import type { UpdateUserUseCaseRequest, UpdateUserUseCaseResponse } from '@custom-types/use-cases/user/update-user'
import type { ApiError } from '@errors/api-error'
import type { DatabaseContext } from '@lib/prisma/helpers/database-context'
import type { ActivityAreasRepository } from '@repositories/activity-areas-repository'
import type { AddressCountryRepository } from '@repositories/address-countries-repository'
import type { AddressStatesRepository } from '@repositories/address-states-repository'
import type { InstitutionsRepository } from '@repositories/institutions-repository'
import type { UsersRepository } from '@repositories/users-repository'
import { env } from '@env/index'
import { logger } from '@lib/logger'
import { tokens } from '@lib/tsyringe/helpers/tokens'
import { USER_UPDATE_SUCCESSFUL } from '@messages/loggings/user-loggings'
import { ActivityAreaType } from '@prisma/client'
import { buildUserProfileImageUrl } from '@services/builders/urls/build-user-profile-image-url'
import { isUpdateUserHighLevelEducation } from '@services/guards/is-update-user-high-level-education'
import { isUpdateUserHighLevelStudentEducation } from '@services/guards/is-update-user-high-level-student-education'
import { validateActivityAreas } from '@services/validators/validate-activity-areas'
import { validateInstitutionName } from '@services/validators/validate-institution-name'
import { InvalidActivityArea } from '@use-cases/errors/user/invalid-activity-areas-error'
import { InvalidInstitutionName } from '@use-cases/errors/user/invalid-institution-name-error'
import { UserAlreadyExistsError } from '@use-cases/errors/user/user-already-exists-error'
import { UserWithSameEmail } from '@use-cases/errors/user/user-with-same-email-error'
import { UserWithSameUsername } from '@use-cases/errors/user/user-with-same-username-error'
import { getTrueMapping } from '@utils/mappers/get-true-mapping'
import { ensureExists } from '@utils/validators/ensure'
import { hash } from 'bcryptjs'
import { inject, injectable } from 'tsyringe'
import { UserNotFoundError } from '../errors/user/user-not-found-error'

@injectable()
export class UpdateUserUseCase {
  constructor(
    @inject(tokens.repositories.users)
    private readonly usersRepository: UsersRepository,

    @inject(tokens.repositories.activityAreas)
    private readonly activityAreasRepository: ActivityAreasRepository,

    @inject(tokens.repositories.institutions)
    private readonly institutionsRepository: InstitutionsRepository,

    @inject(tokens.repositories.addressStates)
    private readonly addressStatesRepository: AddressStatesRepository,

    @inject(tokens.repositories.addressCountries)
    private readonly addressCountriesRepository: AddressCountryRepository,

    @inject(tokens.infra.database)
    private readonly dbContext: DatabaseContext,
  ) {}

  async execute({ publicId, data }: UpdateUserUseCaseRequest): Promise<UpdateUserUseCaseResponse> {
    const passwordHash = data.user?.password ? await hash(data.user.password, env.HASH_SALT_ROUNDS) : undefined

    const updatedUser = await this.dbContext.runInTransaction(async () => {
      const userExists = ensureExists({
        value: await this.usersRepository.findByPublicId(publicId),
        error: new UserNotFoundError(),
      })

      let userUpdateInfo: UpdateUserQuery['data']['user'] | undefined

      let addressUpdateInfo: UpdateUserQuery['data']['address'] | undefined

      if (data.user) {
        if (
          (data.user.email || data.user.username) &&
          (data.user.email !== userExists.email || data.user.username !== userExists.username)
        ) {
          const userConflictingUpdateInfo = await this.usersRepository.findConflictingUser({
            email: data.user.email,
            username: data.user.username,
          })

          if (userConflictingUpdateInfo) {
            const apiError = getTrueMapping<ApiError>([
              {
                expression: userConflictingUpdateInfo.email === data.user.email,
                value: new UserWithSameEmail(),
              },
              {
                expression: userConflictingUpdateInfo.username === data.user.username,
                value: new UserWithSameUsername(),
              },
            ])

            if (!apiError) {
              throw new UserAlreadyExistsError()
            }

            throw apiError
          }
        }

        const { password, ...filteredUserUpdateData } = data.user

        userUpdateInfo = {
          ...filteredUserUpdateData,
          passwordHash: passwordHash ?? userExists.passwordHash,
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

      if (isUpdateUserHighLevelStudentEducation(data) || isUpdateUserHighLevelEducation(data)) {
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

          const { validatedActivityAreas, success } = await validateActivityAreas({
            activityAreas,
            activityAreasRepository: this.activityAreasRepository,
          })

          if (!success) {
            throw new InvalidActivityArea(
              validatedActivityAreas.map((activityArea) => JSON.stringify(activityArea, null, 2)).toString(),
            )
          }
        }

        if (data.institution) {
          const isValidInstitution = await validateInstitutionName({
            institution: data.institution.name,
            institutionsRepository: this.institutionsRepository,
          })

          if (!isValidInstitution) {
            throw new InvalidInstitutionName()
          }
        }
      }

      const user = await this.usersRepository.update({
        id: userExists.id,
        data: {
          ...data,
          address: addressUpdateInfo,
          user: userUpdateInfo,
        },
      })

      return user
    })

    logger.info({ publicId }, USER_UPDATE_SUCCESSFUL)

    return {
      user: {
        ...updatedUser,
        profileImage: buildUserProfileImageUrl(updatedUser.profileImage),
      },
    }
  }
}
