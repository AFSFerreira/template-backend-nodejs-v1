import { DEFAULT_PROFILE_IMAGE_PATH } from '@constants/file-constants'
import type { FindConflictingUserQuery } from '@custom-types/repositories/user/find-conflicting-user-query'
import type { UserWithDetails } from '@custom-types/validator/user-with-details'
import { env } from '@env/index'
import { logger } from '@lib/logger'
import { PROFILE_IMAGE_PERSIST_ERROR, SUCCESSFUL_USER_CREATION } from '@messages/loggings'
import { ActivityAreaType } from '@prisma/client'
import type { ActivityAreasRepository } from '@repositories/activity-areas-repository'
import type { InstitutionsRepository } from '@repositories/institutions-repository'
import type { UsersRepository } from '@repositories/users-repository'
import type { RegisterUserBodySchemaType } from '@schemas/user/register-body-schema'
import { lowLevelEducationEnumSchema } from '@schemas/utils/enums/education-level-enum-schema'
import { getAllInstitutions } from '@services/get-all-institutions'
import { InvalidInstitutionName } from '@use-cases/errors/user/invalid-institution-name-error'
import { UserAlreadyExistsError } from '@use-cases/errors/user/user-already-exists-error'
import { UserWithSameIdentityDocument } from '@use-cases/errors/user/user-with-same-identity-document-error'
import { UserWithSameUsername } from '@use-cases/errors/user/user-with-same-username-error'
import { objectDeepEqual } from '@utils/object-deep-equal'
import { persistUserProfileImage } from '@utils/persist-user-profile-image'
import { hash } from 'bcryptjs'
import stableStringify from 'json-stable-stringify'
import { InvalidActivityArea } from '../errors/user/invalid-activity-areas-error'
import { UserWithSameEmail } from '../errors/user/user-with-same-email-error'

interface RegisterUseCaseRequest {
  user: RegisterUserBodySchemaType['user']
  address: RegisterUserBodySchemaType['address']
  keyword?: RegisterUserBodySchemaType['keyword']
  enrolledCourse?: RegisterUserBodySchemaType['enrolledCourse']
  academicPublication?: RegisterUserBodySchemaType['academicPublication']
  activityArea?: RegisterUserBodySchemaType['activityArea']
  institution?: RegisterUserBodySchemaType['institution']
}

interface RegisterUseCaseResponse {
  user: UserWithDetails
}

export class RegisterUseCase {
  constructor(
    private readonly usersRepository: UsersRepository,
    private readonly activityAreasRepository: ActivityAreasRepository,
    private readonly institutionsRepository: InstitutionsRepository,
  ) {}

  async execute(registerUseCaseInput: RegisterUseCaseRequest): Promise<RegisterUseCaseResponse> {
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
      // Valida as áreas de atividade dos artigos e do usuário:
      const academicPublicationsActivityAreas = registerUseCaseInput.academicPublication.map((academicPub) => ({
        area: academicPub.area,
        type: ActivityAreaType.SUB_AREA_OF_ACTIVITY,
      }))

      const allUserActivityAreas = [
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

      const activityAreasFound = await this.activityAreasRepository.findManyByArea(allUserActivityAreas)

      const activityAreasFoundSet = new Set(
        activityAreasFound.map((activityArea) =>
          stableStringify({
            area: activityArea.area,
            type: activityArea.type,
          }),
        ),
      )

      const wrongActivityAreas = allUserActivityAreas.filter((activityArea) => {
        return !activityAreasFoundSet.has(stableStringify(activityArea))
      })

      if (wrongActivityAreas.length !== 0) {
        throw new InvalidActivityArea(
          wrongActivityAreas.map((activityArea) => JSON.stringify(activityArea, null, 2)).toString(),
        )
      }
    }

    const institutionsNames = await getAllInstitutions(this.institutionsRepository, {
      name: registerUseCaseInput.institution.name,
    })

    if (!institutionsNames.includes(registerUseCaseInput.institution.name)) {
      throw new InvalidInstitutionName()
    }

    // Caso ocorra um erro durante a
    // persistência da imagem de perfil:
    let imageHandleError = true

    if (registerUseCaseInput.user.profileImage) {
      try {
        await persistUserProfileImage(registerUseCaseInput.user.profileImage)
        imageHandleError = false
      } catch (_error: unknown) {
        logger.error({ profileImage: registerUseCaseInput.user.profileImage }, PROFILE_IMAGE_PERSIST_ERROR)
      }
    }

    const passwordHash = await hash(registerUseCaseInput.user.password, env.HASH_SALT_ROUNDS)

    const { password, identity, ...filteredUserInfo } = registerUseCaseInput.user

    const user = await this.usersRepository.create({
      user: {
        ...filteredUserInfo,
        identityType: identity.identityType,
        identityDocument: identity.identityDocument,
        profileImage: imageHandleError ? DEFAULT_PROFILE_IMAGE_PATH : registerUseCaseInput.user.profileImage,
        passwordHash,
      },
      institution: registerUseCaseInput.institution,
      activityArea: registerUseCaseInput.activityArea,
      address: registerUseCaseInput.address,
      academicPublication: registerUseCaseInput.academicPublication,
      enrolledCourse: registerUseCaseInput.enrolledCourse,
      keyword: registerUseCaseInput.keyword,
    })

    logger.info(SUCCESSFUL_USER_CREATION)

    return { user }
  }
}
