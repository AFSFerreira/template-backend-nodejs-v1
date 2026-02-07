import type { UpdateUserQuery } from '@custom-types/repository/prisma/user/update-user-query'
import type { UpdateUserUseCaseRequest, UpdateUserUseCaseResponse } from '@custom-types/use-cases/user/update-user'
import type { DatabaseContext } from '@lib/prisma/helpers/database-context'
import type { ActivityAreasRepository } from '@repositories/activity-areas-repository'
import type { AddressCountryRepository } from '@repositories/address-countries-repository'
import type { AddressStatesRepository } from '@repositories/address-states-repository'
import type { InstitutionsRepository } from '@repositories/institutions-repository'
import type { UsersRepository } from '@repositories/users-repository'
import { USER_DEFAULT_PRESENTER_KEY } from '@constants/presenters-constants'
import { deleteFileEnqueued, moveFileEnqueued } from '@jobs/queues/facades/file-queue-facade'
import { logger } from '@lib/logger'
import { logError } from '@lib/logger/helpers/log-error'
import { tsyringeTokens } from '@lib/tsyringe/helpers/tokens'
import { USER_UPDATE_ERROR, USER_UPDATE_SUCCESSFUL } from '@messages/loggings/models/user-loggings'
import { ActivityAreaType } from '@prisma/generated/enums'
import {
  buildUserProfileImagePath,
  buildUserTempProfileImagePath,
} from '@services/builders/paths/build-user-profile-image-path'
import { buildUserProfileImageUrl } from '@services/builders/urls/build-user-profile-image-url'
import { isUpdateUserHighLevelEducation } from '@services/guards/is-update-user-high-level-education'
import { isUpdateUserHighLevelStudentEducation } from '@services/guards/is-update-user-high-level-student-education'
import { validateActivityAreas } from '@services/validators/validate-activity-areas'
import { validateInstitutionName } from '@services/validators/validate-institution-name'
import { InvalidActivityArea } from '@use-cases/errors/user/invalid-activity-areas-error'
import { InvalidInstitutionName } from '@use-cases/errors/user/invalid-institution-name-error'
import { UserProfileImagePersistenceError } from '@use-cases/errors/user/user-profile-image-persistence-error'
import { UserWithSameUsername } from '@use-cases/errors/user/user-with-same-username-error'
import { sanitizeUrlFilename } from '@utils/formatters/sanitize-url-filename'
import { ensureExists } from '@utils/validators/ensure'
import { inject, injectable } from 'tsyringe'
import { UserNotFoundError } from '../errors/user/user-not-found-error'

@injectable()
export class UpdateUserUseCase {
  constructor(
    @inject(tsyringeTokens.repositories.users)
    private readonly usersRepository: UsersRepository,

    @inject(tsyringeTokens.repositories.activityAreas)
    private readonly activityAreasRepository: ActivityAreasRepository,

    @inject(tsyringeTokens.repositories.institutions)
    private readonly institutionsRepository: InstitutionsRepository,

    @inject(tsyringeTokens.repositories.addressStates)
    private readonly addressStatesRepository: AddressStatesRepository,

    @inject(tsyringeTokens.repositories.addressCountries)
    private readonly addressCountriesRepository: AddressCountryRepository,

    @inject(tsyringeTokens.infra.database)
    private readonly dbContext: DatabaseContext,
  ) {}

  async execute({ publicId, data }: UpdateUserUseCaseRequest): Promise<UpdateUserUseCaseResponse> {
    let newProfileImage: string | undefined

    const { user } = await this.dbContext.runInTransaction(async () => {
      const userExists = ensureExists({
        value: await this.usersRepository.findByPublicId(publicId),
        error: new UserNotFoundError(),
      })

      let userUpdateInfo: UpdateUserQuery['data']['user'] | undefined

      let addressUpdateInfo: UpdateUserQuery['data']['address'] | undefined

      if (data.user) {
        if (data.user.username && data.user.username !== userExists.username) {
          const userConflictingUpdateInfo = await this.usersRepository.findByUsername(data.user.username)

          if (userConflictingUpdateInfo) {
            throw new UserWithSameUsername()
          }
        }

        if (data.user.profileImage) {
          const profileImageSanitized = sanitizeUrlFilename(data.user.profileImage)

          newProfileImage =
            profileImageSanitized && profileImageSanitized !== userExists.profileImage
              ? profileImageSanitized
              : undefined
        }

        userUpdateInfo = data.user
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

      return { user }
    })

    const userProfileImagePaths = newProfileImage
      ? {
          oldFilePath: buildUserTempProfileImagePath(newProfileImage),
          newFilePath: buildUserProfileImagePath(newProfileImage),
        }
      : undefined

    try {
      if (userProfileImagePaths) {
        ensureExists({
          value: await moveFileEnqueued(userProfileImagePaths),
          error: new UserProfileImagePersistenceError(),
        })
      }

      // Enfileirando a remoção da imagem antiga somente após persistir a nova:
      if (newProfileImage && user.profileImage !== USER_DEFAULT_PRESENTER_KEY) {
        await deleteFileEnqueued({
          filePath: buildUserProfileImagePath(user.profileImage),
        })
      }
    } catch (error) {
      logError({ error, message: USER_UPDATE_ERROR })

      // Enfileirando a restauração da imagem de perfil previamente persistida:
      if (userProfileImagePaths) {
        await moveFileEnqueued({
          oldFilePath: userProfileImagePaths.newFilePath,
          newFilePath: userProfileImagePaths.oldFilePath,
        })
      }

      throw error
    }

    logger.info({ publicId }, USER_UPDATE_SUCCESSFUL)

    return {
      user: {
        ...user,
        profileImage: buildUserProfileImageUrl(user.profileImage),
      },
    }
  }
}
