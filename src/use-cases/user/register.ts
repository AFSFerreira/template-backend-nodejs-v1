import path from 'path'
import {
  KeywordType,
  type EducationLevel,
  type IdentityType,
  type Occupation,
  type User,
} from '@prisma/client'
import { hash } from 'bcryptjs'
import { InvalidMainAreaOfActivity } from '../errors/invalid-main-area-of-activity-error'
import { UserImageStorageError } from '../errors/user-image-storage-error'
import { UserWithSameEmailOrUsernameError } from '../errors/user-with-same-email-error'
import { env } from '@/env'
import type { RegisterUserSchemaType } from '@/http/schemas/user/register-schema'
import type { AcademicPublicationsRepository } from '@/repositories/academic-publications-repository'
import type { AddressRepository } from '@/repositories/address-repository'
import type { EnrolledCourseRepository } from '@/repositories/enrolled-course-repository'
import type { KeywordRepository } from '@/repositories/keyword-repository'
import type { UsersRepository } from '@/repositories/users-repository'
import { saveCompressedImage } from '@/utils/image-storage'

interface RegisterUseCaseRequest {
  imageBuffer?: Buffer
  mainAreaActivity: string
  keywords: string[]

  user: RegisterUserSchemaType['user']

  address: RegisterUserSchemaType['address']

  enrolledCourse: RegisterUserSchemaType['enrolledCourse']

  academicPublications: RegisterUserSchemaType['academicPublications']
}

interface RegisterUseCaseResponse {
  user: User
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
      type: KeywordType.AREA_OF_ACTIVITY,
    })

    if (mainAreaOfActivity === null) {
      throw new InvalidMainAreaOfActivity()
    }

    // Persiste a imagem do usuário no backend:
    let profileImageInfo:
      | {
          finalImagePath: string
          compressedImageBuffer: Buffer<ArrayBufferLike>
        }
      | undefined

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

    const keywordsCreated = await Promise.all(
      registerUseCaseInput.keywords.map(async (keyword) => {
        return await this.keywordsRepository.findOrCreate({
          value: keyword,
          type: KeywordType.USER_INTEREST,
        })
      }),
    )

    const passwordHash = await hash(
      registerUseCaseInput.user.password,
      env.HASH_SALT_ROUNDS,
    )

    const user = await this.usersRepository.create({
      user: {
        ...registerUseCaseInput.user,
        occupation: registerUseCaseInput.user.occupation as Occupation,
        educationLevel: registerUseCaseInput.user
          .educationLevel as EducationLevel,
        identityType: registerUseCaseInput.user.identityType as IdentityType,
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
        activityAreaId: mainAreaOfActivity.id,
      },
      keywords: keywordsCreated,
    })

    const academicPublicationsData =
      registerUseCaseInput.academicPublications.map((pub) => ({
        ...pub,
        userId: user.id,
      }))

    await Promise.all([
      this.addressRepository.create({
        ...registerUseCaseInput.address,
        userId: user.id,
      }),
      this.enrolledCoursesRepository.create({
        ...registerUseCaseInput.enrolledCourse,
        userId: user.id,
      }),
      this.academicPublicationsRepository.createMany(academicPublicationsData),
    ])

    return { user }
  }
}
