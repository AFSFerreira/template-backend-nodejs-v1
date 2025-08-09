import path from 'path'
import { ActivityAreaType } from '@prisma/client'
import { hash } from 'bcryptjs'
import { InvalidAreaOfActivity } from '../errors/invalid-main-area-of-activity-error'
import { UserImageStorageError } from '../errors/user-image-storage-error'
import { UserWithSameEmailOrUsernameError } from '../errors/user-with-same-email-error'
import type { UserWithDetails } from '@/@types/user-with-details'
import { env } from '@/env'
import type { RegisterUserSchemaType } from '@/http/schemas/user/register-schema'
import type { ActivityAreaRepository } from '@/repositories/activity-area-repository'
import type { UsersRepository } from '@/repositories/users-repository'
import {
  type CompressedImageInfo,
  saveCompressedImage,
} from '@/utils/image-storage'

interface RegisterUseCaseRequest {
  imageBuffer?: Buffer
  user: RegisterUserSchemaType['user']
  address: RegisterUserSchemaType['address']
  enrolledCourse: RegisterUserSchemaType['enrolledCourse']
  academicPublications: RegisterUserSchemaType['academicPublications']
  activityAreas: RegisterUserSchemaType['activityAreas']
  keywords: RegisterUserSchemaType['keywords']
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

    const activityArea = await this.activityAreasRepository.findByArea(
      registerUseCaseInput.activityAreas.activityArea,
      ActivityAreaType.AREA_OF_ACTIVITY,
    )

    if (activityArea === null) {
      throw new InvalidAreaOfActivity(
        registerUseCaseInput.activityAreas.activityArea,
      )
    }

    const subActivityArea = await this.activityAreasRepository.findByArea(
      registerUseCaseInput.activityAreas.subActivityArea,
      ActivityAreaType.SUB_AREA_OF_ACTIVITY,
    )

    if (subActivityArea === null) {
      throw new InvalidAreaOfActivity(
        registerUseCaseInput.activityAreas.subActivityArea,
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
        profileImagePath:
          profileImageInfo !== undefined
            ? profileImageInfo.finalImagePath
            : path.resolve(
                process.cwd(),
                'uploads',
                'profile-images',
                'default-profile-pic.png',
              ),
      },
      activityAreas: registerUseCaseInput.activityAreas,
      address: registerUseCaseInput.address,
      academicPublications: registerUseCaseInput.academicPublications,
      enrolledCourse: registerUseCaseInput.enrolledCourse,
      keywords: registerUseCaseInput.keywords,
    })

    return { user }
  }
}
