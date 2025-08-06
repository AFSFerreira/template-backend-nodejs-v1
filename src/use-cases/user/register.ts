import path from 'path'
import { hash } from 'bcryptjs'
import { InvalidMainAreaOfActivity } from '../errors/invalid-main-area-of-activity-error'
import { UserImageStorageError } from '../errors/user-image-storage-error'
import { UserWithSameEmailOrUsernameError } from '../errors/user-with-same-email-error'
import type { UserWithDetails } from '@/@types/user-with-details'
import { env } from '@/env'
import type { RegisterUserSchemaType } from '@/http/schemas/user/register-schema'
import type { AcademicPublicationsRepository } from '@/repositories/academic-publications-repository'
import type { AddressRepository } from '@/repositories/address-repository'
import type { EnrolledCourseRepository } from '@/repositories/enrolled-course-repository'
import type { KeywordRepository } from '@/repositories/keyword-repository'
import type { UsersRepository } from '@/repositories/users-repository'
import {
  type CompressedImageInfo,
  saveCompressedImage,
} from '@/utils/image-storage'

interface RegisterUseCaseRequest {
  imageBuffer?: Buffer
  mainAreaActivity: RegisterUserSchemaType['mainAreaActivity']
  keywords: RegisterUserSchemaType['keywords']
  user: RegisterUserSchemaType['user']
  address: RegisterUserSchemaType['address']
  enrolledCourse: RegisterUserSchemaType['enrolledCourse']
  academicPublications: RegisterUserSchemaType['academicPublications']
}

interface RegisterUseCaseResponse {
  user: UserWithDetails
}

export class RegisterUseCase {
  constructor(
    private readonly usersRepository: UsersRepository,
    private readonly addressRepository: AddressRepository,
    private readonly academicPublicationsRepository: AcademicPublicationsRepository,
    private readonly enrolledCoursesRepository: EnrolledCourseRepository,
    private readonly keywordsRepository: KeywordRepository,
  ) {}

  async execute(
    registerUseCaseInput: RegisterUseCaseRequest,
  ): Promise<RegisterUseCaseResponse> {
    const existingUser = await this.usersRepository.findByEmailOrUsername(
      registerUseCaseInput.user.email,
      registerUseCaseInput.user.username,
    )

    if (existingUser !== null) {
      throw new UserWithSameEmailOrUsernameError()
    }

    const mainAreaOfActivity = await this.keywordsRepository.findBy({
      value: registerUseCaseInput.mainAreaActivity,
    })

    if (mainAreaOfActivity === null) {
      throw new InvalidMainAreaOfActivity()
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

    const user = await this.usersRepository.create({
      user: {
        ...registerUseCaseInput.user,
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
      mainAreaActivity: registerUseCaseInput.mainAreaActivity,
      address: registerUseCaseInput.address,
      academicPublications: registerUseCaseInput.academicPublications,
      enrolledCourse: registerUseCaseInput.enrolledCourse,
      keywords: registerUseCaseInput.keywords,
    })

    return { user }
  }
}
