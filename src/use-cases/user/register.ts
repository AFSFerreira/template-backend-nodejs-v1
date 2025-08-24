import path from 'path'
import type { UserWithDetails } from '@custom-types/user-with-details'
import { env } from '@env/index'
import { ActivityAreaType } from '@prisma/client'
import type { ActivityAreaRepository } from '@repositories/activity-area-repository'
import type { UsersRepository } from '@repositories/users-repository'
import type { RegisterUserBodySchemaType } from '@schemas/user/register-body-schema'
import {
  type CompressedImageInfo,
  saveCompressedImage,
} from '@utils/image-storage'
import { hash } from 'bcryptjs'
import { InvalidActivityArea } from '../errors/invalid-activity-areas-error'
import { UserImageStorageError } from '../errors/user-image-storage-error'
import { UserWithSameEmailOrUsernameError } from '../errors/user-with-same-email-error'

interface RegisterUseCaseRequest {
  imageBuffer?: Buffer
  user: RegisterUserBodySchemaType['user']
  address: RegisterUserBodySchemaType['address']
  enrolledCourse: RegisterUserBodySchemaType['enrolledCourse']
  academicPublication: RegisterUserBodySchemaType['academicPublication']
  activityArea: RegisterUserBodySchemaType['activityArea']
  institution: RegisterUserBodySchemaType['institution']
  keyword: RegisterUserBodySchemaType['keyword']
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

    if (existingUser !== null) {
      throw new UserWithSameEmailOrUsernameError()
    }

    // Valida as áreas de atividade dos artigos e do usuário:
    const academicPublicationsActivityAreas =
      registerUseCaseInput.academicPublication.map((academPub) => ({
        area: academPub.tag,
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

    console.log(activityAreasFound, allUserActivityAreas)

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

    // Persiste a imagem do usuário no backend:
    let profileImageInfo: CompressedImageInfo | undefined

    try {
      if (registerUseCaseInput.imageBuffer !== undefined) {
        profileImageInfo = await saveCompressedImage(
          registerUseCaseInput.imageBuffer,
          path.resolve(process.cwd(), 'uploads', 'profile-images'),
        )
      }
    } catch (error) {
      throw new UserImageStorageError()
    }

    const passwordHash = await hash(
      registerUseCaseInput.user.password,
      env.HASH_SALT_ROUNDS,
    )

    const { password, ...filteredUserInfo } = registerUseCaseInput.user

    const user = await this.usersRepository.create({
      user: {
        ...filteredUserInfo,
        passwordHash,
        profileImage:
          profileImageInfo !== undefined
            ? profileImageInfo.finalImagePath
            : path.resolve(
                process.cwd(),
                'uploads',
                'profile-images',
                'default-profile-pic.png',
              ),
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
