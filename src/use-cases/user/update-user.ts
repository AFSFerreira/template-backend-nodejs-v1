import type { UpdateUserQuery } from '@custom-types/repository/prisma/user/update-user-query'
import type { UpdateUserUseCaseRequest, UpdateUserUseCaseResponse } from '@custom-types/use-cases/user/update-user'
import type { DatabaseContext } from '@lib/prisma/helpers/database-context'
import type { AddressCountryRepository } from '@repositories/address-countries-repository'
import type { AddressStatesRepository } from '@repositories/address-states-repository'
import type { UsersRepository } from '@repositories/users-repository'
import { USER_DEFAULT_PRESENTER_KEY } from '@constants/presenters-constants'
import { deleteFileEnqueued, moveFileEnqueued } from '@jobs/queues/facades/file-queue-facade'
import { logger } from '@lib/pino'
import { tsyringeTokens } from '@lib/tsyringe/helpers/tokens'
import { USER_UPDATE_SUCCESSFUL } from '@messages/loggings/models/user-loggings'
import { ActivityAreaType } from '@prisma/generated/enums'
import { ActivityAreaValidationService } from '@services/validators/validate-activity-areas'
import { InstitutionValidationService } from '@services/validators/validate-institution-name'
import { InvalidActivityArea } from '@use-cases/errors/user/invalid-activity-areas-error'
import { InvalidInstitutionName } from '@use-cases/errors/user/invalid-institution-name-error'
import { UserWithSameUsername } from '@use-cases/errors/user/user-with-same-username-error'
import {
  buildUserProfileImagePath,
  buildUserTempProfileImagePath,
} from '@utils/builders/paths/build-user-profile-image-path'
import { sanitizeUrlFilename } from '@utils/formatters/sanitize-url-filename'
import { isUpdateUserHighLevelEducation } from '@utils/guards/is-update-user-high-level-education'
import { isUpdateUserHighLevelStudentEducation } from '@utils/guards/is-update-user-high-level-student-education'
import { ensureExists } from '@utils/validators/ensure'
import { inject, singleton } from 'tsyringe'
import { UserNotFoundError } from '../errors/user/user-not-found-error'

@singleton()
export class UpdateUserUseCase {
  constructor(
    @inject(tsyringeTokens.repositories.users)
    private readonly usersRepository: UsersRepository,

    @inject(tsyringeTokens.repositories.addressStates)
    private readonly addressStatesRepository: AddressStatesRepository,

    @inject(tsyringeTokens.repositories.addressCountries)
    private readonly addressCountriesRepository: AddressCountryRepository,

    @inject(tsyringeTokens.infra.database)
    private readonly dbContext: DatabaseContext,

    @inject(ActivityAreaValidationService)
    private readonly activityAreaValidationService: ActivityAreaValidationService,

    @inject(InstitutionValidationService)
    private readonly institutionValidationService: InstitutionValidationService,
  ) {}

  async execute({ publicId, data }: UpdateUserUseCaseRequest): Promise<UpdateUserUseCaseResponse> {
    let newProfileImage: string | undefined

    const isHighLevelEducation = isUpdateUserHighLevelStudentEducation(data) || isUpdateUserHighLevelEducation(data)

    const userExists = ensureExists({
      value: await this.usersRepository.findByPublicId(publicId),
      error: new UserNotFoundError(),
    })

    let userUpdateInfo: UpdateUserQuery['data']['user'] | undefined

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
          profileImageSanitized && profileImageSanitized !== userExists.profileImage ? profileImageSanitized : undefined
      }

      userUpdateInfo = data.user
    }

    if (isHighLevelEducation) {
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

        // Removendo activity areas duplicadas:
        const nonRepeatingActivityAreas = activityAreas.filter(
          (activityArea, index, self) =>
            index === self.findIndex((a) => a.area === activityArea.area && a.type === activityArea.type),
        )

        const { validatedActivityAreas, success } =
          await this.activityAreaValidationService.validate(nonRepeatingActivityAreas)

        if (!success) {
          throw new InvalidActivityArea(
            validatedActivityAreas.map((activityArea) => JSON.stringify(activityArea, null, 2)).toString(),
          )
        }
      }

      if (data.institution) {
        const isValidInstitution = await this.institutionValidationService.validate(data.institution.name)

        if (!isValidInstitution) {
          throw new InvalidInstitutionName()
        }
      }
    }

    // Removendo elementos duplicados de keywords:
    const nonRepeatingKeywords =
      isHighLevelEducation && data.keyword ? Array.from<string>(new Set<string>(data.keyword)) : undefined

    const shouldUpdate = Object.keys(data).length > 0 || userUpdateInfo !== undefined || data.address !== undefined

    const user = shouldUpdate
      ? await this.dbContext.runInTransaction(async () => {
          let resolvedAddressUpdateInfo: UpdateUserQuery['data']['address'] | undefined

          if (data.address) {
            const addressCountry = await this.addressCountriesRepository.findOrCreate(data.address.country)

            const addressState = await this.addressStatesRepository.findOrCreate({
              state: data.address.state,
              countryId: addressCountry.id,
            })

            const { state, country, ...filteredAddressUpdateData } = data.address

            resolvedAddressUpdateInfo = {
              ...filteredAddressUpdateData,
              stateId: addressState.id,
            }
          }

          return this.usersRepository.update({
            id: userExists.id,
            data: {
              ...data,
              ...(isHighLevelEducation ? { keyword: nonRepeatingKeywords } : {}),
              address: resolvedAddressUpdateInfo,
              user: userUpdateInfo,
            },
          })
        })
      : userExists

    const userProfileImagePaths = newProfileImage
      ? {
          oldFilePath: buildUserTempProfileImagePath(newProfileImage),
          newFilePath: buildUserProfileImagePath(newProfileImage),
        }
      : undefined

    if (userProfileImagePaths) {
      await moveFileEnqueued(userProfileImagePaths)
    }

    // Enfileirando a remoção da imagem antiga somente após persistir a nova:
    if (newProfileImage && user.profileImage !== USER_DEFAULT_PRESENTER_KEY) {
      await deleteFileEnqueued({
        filePath: buildUserProfileImagePath(user.profileImage),
      })
    }

    logger.info({ publicId }, USER_UPDATE_SUCCESSFUL)

    return { user }
  }
}
