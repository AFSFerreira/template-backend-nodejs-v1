import type { FindConflictingUserQuery } from '@custom-types/repository/prisma/user/find-conflicting-user-query'
import type { RegisterUseCaseRequest, RegisterUseCaseResponse } from '@custom-types/use-cases/user/register'
import type { ApiError } from '@errors/api-error'
import type { DatabaseContext } from '@lib/prisma/helpers/database-context'
import type { ActivityAreasRepository } from '@repositories/activity-areas-repository'
import type { AddressCountryRepository } from '@repositories/address-countries-repository'
import type { AddressStatesRepository } from '@repositories/address-states-repository'
import type { InstitutionsRepository } from '@repositories/institutions-repository'
import type { UsersRepository } from '@repositories/users-repository'
import path from 'node:path'
import { DEFAULT_PROFILE_IMAGE_NAME } from '@constants/static-file-constants'
import { env } from '@env/index'
import { logger } from '@lib/logger'
import { logError } from '@lib/logger/helpers/log-error'
import { tokens } from '@lib/tsyringe/helpers/tokens'
import { SUCCESSFUL_USER_CREATION, USER_CREATION_ERROR } from '@messages/loggings/user-loggings'
import { ActivityAreaType } from '@prisma/client'
import {
  buildUserProfileImagePath,
  buildUserTempProfileImagePath,
} from '@services/builders/paths/build-user-profile-image-path'
import { buildUserProfileImageUrl } from '@services/builders/urls/build-user-profile-image-url'
import { moveFile } from '@services/files/move-file'
import { isRegisterUserHighLevelEducation } from '@services/guards/is-register-user-high-level-education'
import { isRegisterUserHighLevelStudentEducation } from '@services/guards/is-register-user-high-level-student-education'
import { validateActivityAreas } from '@services/validators/validate-activity-areas'
import { validateInstitutionName } from '@services/validators/validate-institution-name'
import { InvalidActivityArea } from '@use-cases/errors/user/invalid-activity-areas-error'
import { InvalidInstitutionName } from '@use-cases/errors/user/invalid-institution-name-error'
import { UserAlreadyExistsError } from '@use-cases/errors/user/user-already-exists-error'
import { UserImageStorageError } from '@use-cases/errors/user/user-image-storage-error'
import { UserWithSameIdentityDocument } from '@use-cases/errors/user/user-with-same-identity-document-error'
import { UserWithSameUsername } from '@use-cases/errors/user/user-with-same-username-error'
import { getTrueMapping } from '@utils/mappers/get-true-mapping'
import { objectDeepEqual } from '@utils/object/object-deep-equal'
import { hash } from 'bcryptjs'
import { inject, injectable } from 'tsyringe'
import { UserWithSameEmail } from '../errors/user/user-with-same-email-error'

@injectable()
export class RegisterUseCase {
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

  async execute(registerUseCaseInput: RegisterUseCaseRequest): Promise<RegisterUseCaseResponse> {
    let profileImage = DEFAULT_PROFILE_IMAGE_NAME

    if (registerUseCaseInput.user.profileImage) {
      const profileImagePersistSucessful = await moveFile({
        oldFilePath: buildUserTempProfileImagePath(registerUseCaseInput.user.profileImage),
        newFilePath: buildUserProfileImagePath(registerUseCaseInput.user.profileImage),
      })

      if (!profileImagePersistSucessful) {
        throw new UserImageStorageError()
      }

      profileImage = path.basename(profileImagePersistSucessful)
    }

    const passwordHash = await hash(registerUseCaseInput.user.password, env.HASH_SALT_ROUNDS)

    try {
      const createdUser = await this.dbContext.runInTransaction(async () => {
        const userAlreadyExists = await this.usersRepository.findConflictingUser({
          email: registerUseCaseInput.user.email,
          username: registerUseCaseInput.user.username,
          identity: registerUseCaseInput.user.identity as FindConflictingUserQuery['identity'],
        })

        if (userAlreadyExists) {
          const apiError = getTrueMapping<ApiError>([
            {
              expression: userAlreadyExists.email === registerUseCaseInput.user.email,
              value: new UserWithSameEmail(),
            },
            {
              expression: userAlreadyExists.username === registerUseCaseInput.user.username,
              value: new UserWithSameUsername(),
            },
            {
              expression: objectDeepEqual(
                { identityDocument: userAlreadyExists.identityDocument, identityType: userAlreadyExists.identityType },
                registerUseCaseInput.user.identity,
              ),
              value: new UserWithSameIdentityDocument(),
            },
          ])

          if (!apiError) {
            throw new UserAlreadyExistsError()
          }

          throw apiError
        }

        if (
          isRegisterUserHighLevelStudentEducation(registerUseCaseInput) ||
          isRegisterUserHighLevelEducation(registerUseCaseInput)
        ) {
          const academicPublicationsActivityAreas = registerUseCaseInput.academicPublication.map((academicPub) => ({
            area: academicPub.area,
            type: ActivityAreaType.SUB_AREA_OF_ACTIVITY,
          }))

          const activityAreas = [
            ...academicPublicationsActivityAreas,
            {
              area: registerUseCaseInput.activityArea.mainActivityArea,
              type: ActivityAreaType.AREA_OF_ACTIVITY,
            },
            {
              area: registerUseCaseInput.activityArea.subActivityArea,
              type: ActivityAreaType.SUB_AREA_OF_ACTIVITY,
            },
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

          const isValidInstitution = await validateInstitutionName({
            institution: registerUseCaseInput.institution.name,
            institutionsRepository: this.institutionsRepository,
          })

          if (!isValidInstitution) {
            throw new InvalidInstitutionName()
          }
        }

        const addressCountry = await this.addressCountriesRepository.findOrCreate(registerUseCaseInput.address.country)

        const addressState = await this.addressStatesRepository.findOrCreate({
          state: registerUseCaseInput.address.state,
          countryId: addressCountry.id,
        })

        const { password, identity, ...filteredUserInfo } = registerUseCaseInput.user
        const { state, country, ...filteredAddressInfo } = registerUseCaseInput.address

        const user = await this.usersRepository.create({
          ...registerUseCaseInput,
          user: {
            ...filteredUserInfo,
            identityType: identity.identityType,
            identityDocument: identity.identityDocument,
            profileImage,
            passwordHash,
          },
          address: {
            ...filteredAddressInfo,
            stateId: addressState.id,
          },
        })

        return user
      })

      logger.info({ userPublicId: createdUser.publicId, fullName: createdUser.fullName }, SUCCESSFUL_USER_CREATION)

      return {
        user: {
          ...createdUser,
          profileImage: buildUserProfileImageUrl(createdUser.profileImage),
        },
      }
    } catch (error) {
      logError({ error, message: USER_CREATION_ERROR })

      // Restaurando a imagem incorretamente persistida:
      if (registerUseCaseInput.user.profileImage) {
        await moveFile({
          oldFilePath: buildUserProfileImagePath(registerUseCaseInput.user.profileImage),
          newFilePath: buildUserTempProfileImagePath(registerUseCaseInput.user.profileImage),
        })
      }

      throw error
    }
  }
}
