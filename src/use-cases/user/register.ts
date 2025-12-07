import { DEFAULT_PROFILE_IMAGE_NAME } from '@constants/file-constants'
import type { FindConflictingUserQuery } from '@custom-types/repositories/user/find-conflicting-user-query'
import type { RegisterUseCaseRequest, RegisterUseCaseResponse } from '@custom-types/use-cases/user/register'
import { env } from '@env/index'
import { logger } from '@lib/logger'
import { logError } from '@lib/logger/helpers/log-error'
import type { DatabaseContext } from '@lib/prisma/helpers/database-context'
import { tokens } from '@lib/tsyringe/helpers/tokens'
import { REMOVE_REGISTER_IMAGE_FALLBACK_ERROR, SUCCESSFUL_USER_CREATION } from '@messages/loggings'
import { ActivityAreaType } from '@prisma/client'
import type { ActivityAreasRepository } from '@repositories/activity-areas-repository'
import type { AddressCountryRepository } from '@repositories/address-countries-repository'
import type { AddressStatesRepository } from '@repositories/address-states-repository'
import type { InstitutionsRepository } from '@repositories/institutions-repository'
import type { UsersRepository } from '@repositories/users-repository'
import { lowLevelEducationEnumSchema } from '@schemas/utils/enums/education-level-enum-schema'
import { getAllInstitutions } from '@services/get-all-institutions'
import { persistUserProfileImage } from '@services/persist-user-profile-image'
import { validateActivityAreas } from '@services/validate-activity-areas'
import { InvalidInstitutionName } from '@use-cases/errors/user/invalid-institution-name-error'
import { UserAlreadyExistsError } from '@use-cases/errors/user/user-already-exists-error'
import { UserWithSameIdentityDocument } from '@use-cases/errors/user/user-with-same-identity-document-error'
import { UserWithSameUsername } from '@use-cases/errors/user/user-with-same-username-error'
import { deleteFile } from '@utils/files/delete-file'
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
    const profileImagePersistSuccess = registerUseCaseInput.user.profileImage
      ? await persistUserProfileImage(registerUseCaseInput.user.profileImage)
      : false

    const passwordHash = await hash(registerUseCaseInput.user.password, env.HASH_SALT_ROUNDS)

    try {
      const createdUser = await this.dbContext.runInTransaction(async () => {
        const userAlreadyExists = await this.usersRepository.findConflictingUser({
          email: registerUseCaseInput.user.email,
          username: registerUseCaseInput.user.username,
          identity: registerUseCaseInput.user.identity as FindConflictingUserQuery['identity'],
        })

        if (userAlreadyExists) {
          if (userAlreadyExists.email === registerUseCaseInput.user.email) {
            throw new UserWithSameEmail()
          }

          if (userAlreadyExists.username === registerUseCaseInput.user.username) {
            throw new UserWithSameUsername()
          }

          if (
            objectDeepEqual(
              { identityDocument: userAlreadyExists.identityDocument, identityType: userAlreadyExists.identityType },
              registerUseCaseInput.user.identity,
            )
          ) {
            throw new UserWithSameIdentityDocument()
          }

          throw new UserAlreadyExistsError()
        }

        if (!lowLevelEducationEnumSchema.safeParse(registerUseCaseInput.user.educationLevel).success) {
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

          await validateActivityAreas({
            activityAreas,
            activityAreasRepository: this.activityAreasRepository,
          })
        }

        const institutionsNames = await getAllInstitutions({
          institutionsRepository: this.institutionsRepository,
          query: {
            name: registerUseCaseInput.institution.name,
            limit: Number.MAX_SAFE_INTEGER,
          },
        })

        if (!institutionsNames.includes(registerUseCaseInput.institution.name)) {
          throw new InvalidInstitutionName()
        }

        const addressCountry = await this.addressCountriesRepository.findOrCreate(registerUseCaseInput.address.country)

        const addressState = await this.addressStatesRepository.findOrCreate({
          state: registerUseCaseInput.address.state,
          countryId: addressCountry.id,
        })

        const { password, identity, ...filteredUserInfo } = registerUseCaseInput.user
        const { state, country, ...filteredAddressInfo } = registerUseCaseInput.address

        const user = await this.usersRepository.create({
          user: {
            ...filteredUserInfo,
            identityType: identity.identityType,
            identityDocument: identity.identityDocument,
            profileImage: profileImagePersistSuccess
              ? registerUseCaseInput.user.profileImage
              : DEFAULT_PROFILE_IMAGE_NAME,
            passwordHash,
          },
          address: {
            ...filteredAddressInfo,
            stateId: addressState.id,
          },
          institution: registerUseCaseInput.institution,
          activityArea: registerUseCaseInput.activityArea,
          academicPublication: registerUseCaseInput.academicPublication,
          enrolledCourse: registerUseCaseInput.enrolledCourse,
          keyword: registerUseCaseInput.keyword,
        })

        return user
      })

      logger.info(SUCCESSFUL_USER_CREATION)

      return { user: createdUser }
    } catch (error) {
      // Removendo imagem incorretamente persistida:
      if (profileImagePersistSuccess) {
        try {
          await deleteFile(profileImagePersistSuccess)
        } catch (error) {
          logError({ error, message: REMOVE_REGISTER_IMAGE_FALLBACK_ERROR })
        }
      }

      throw error
    }
  }
}
