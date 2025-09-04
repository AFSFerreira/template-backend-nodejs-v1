import path from 'path'
import {
  DEFAULT_PROFILE_IMAGE_PATH,
  REGISTER_PROFILE_IMAGES_PATH,
  REGISTER_TEMP_PROFILE_IMAGES_PATH,
} from '@constants/file-paths'
import type { UserWithDetails } from '@custom-types/user-with-details'
import { env } from '@env/index'
import { ActivityAreaType } from '@prisma/client'
import type { ActivityAreaRepository } from '@repositories/activity-area-repository'
import type { UsersRepository } from '@repositories/users-repository'
import type { RegisterUserBodySchemaType } from '@schemas/user/register-body-schema'
import { IdentityDocumentAlreadyUsed } from '@use-cases/errors/user/identity-document-already-used-error'
import { hash } from 'bcryptjs'
import fs from 'fs-extra'
import { InvalidActivityArea } from '../errors/user/invalid-activity-areas-error'
import { UserWithSameEmailOrUsernameError } from '../errors/user/user-with-same-email-error'
import { highLevelEducationSchema } from '@schemas/utils/enums/education-level-schema'

interface RegisterUseCaseRequest {
  user: RegisterUserBodySchemaType['user']
  address: RegisterUserBodySchemaType['address']
  keyword: RegisterUserBodySchemaType['keyword']
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
    private readonly activityAreasRepository: ActivityAreaRepository,
  ) {}

  async execute(
    registerUseCaseInput: RegisterUseCaseRequest,
  ): Promise<RegisterUseCaseResponse> {
    const existingUser = await this.usersRepository.findByEmailOrUsername({
      email: registerUseCaseInput.user.email,
      username: registerUseCaseInput.user.username,
    })

    if (existingUser) {
      throw new UserWithSameEmailOrUsernameError()
    }

    const documentAlreadyUsed =
      await this.usersRepository.findByIdentityDocument({
        identityDocument: registerUseCaseInput.user.identity.identityDocument,
        identityType: registerUseCaseInput.user.identity.identityType,
      })

    if (documentAlreadyUsed) {
      throw new IdentityDocumentAlreadyUsed()
    }

    if (
      highLevelEducationSchema.safeParse(
        registerUseCaseInput.user.educationLevel,
      ).success
    ) {
      // Valida as áreas de atividade dos artigos e do usuário:
      const academicPublicationsActivityAreas =
        registerUseCaseInput.academicPublication.map((academPub) => ({
          area: academPub.area,
          type: ActivityAreaType.SUB_AREA_OF_ACTIVITY,
        }))

      const allUserActivityAreas = [
        {
          area: registerUseCaseInput.activityArea.mainActivityArea,
          type: ActivityAreaType.AREA_OF_ACTIVITY,
        },
        {
          area: registerUseCaseInput.activityArea.subActivityArea,
          type: ActivityAreaType.SUB_AREA_OF_ACTIVITY,
        },
        ...academicPublicationsActivityAreas,
      ]

      const activityAreasFound =
        await this.activityAreasRepository.findManyByArea(allUserActivityAreas)

      const activityAreasFoundSet = new Set(
        activityAreasFound.map((activityArea) =>
          JSON.stringify({
            area: activityArea.area,
            type: activityArea.type,
          }),
        ),
      )

      const wrongActivityAreas = allUserActivityAreas.filter((activityArea) => {
        return !activityAreasFoundSet.has(JSON.stringify(activityArea))
      })

      if (wrongActivityAreas.length !== 0) {
        throw new InvalidActivityArea(
          wrongActivityAreas
            .map((activityArea) => JSON.stringify(activityArea, null, 2))
            .toString(),
        )
      }
    }

    let imageHandleError = false
    let finalImagePath = ''

    try {
      const oldImagePath = path.resolve(
        REGISTER_TEMP_PROFILE_IMAGES_PATH,
        registerUseCaseInput.user.profileImage,
      )
      const newImagePath = path.resolve(
        REGISTER_PROFILE_IMAGES_PATH,
        registerUseCaseInput.user.profileImage,
      )

      await fs.move(oldImagePath, newImagePath, { overwrite: false })

      finalImagePath = newImagePath
    } catch (error) {
      imageHandleError = true
    }

    const passwordHash = await hash(
      registerUseCaseInput.user.password,
      env.HASH_SALT_ROUNDS,
    )

    const { password, identity, ...filteredUserInfo } =
      registerUseCaseInput.user

    const user = await this.usersRepository.create({
      user: {
        ...filteredUserInfo,
        identityType: identity.identityType,
        identityDocument: identity.identityDocument,
        profileImage: imageHandleError
          ? path.resolve(DEFAULT_PROFILE_IMAGE_PATH)
          : finalImagePath,
        passwordHash,
      },
      institution: registerUseCaseInput.institution,
      activityArea: registerUseCaseInput.activityArea,
      address: registerUseCaseInput.address,
      academicPublication: registerUseCaseInput.academicPublication,
      enrolledCourse: registerUseCaseInput.enrolledCourse,
      keyword: registerUseCaseInput.keyword,
    })

    return { user }
  }
}
