import path from 'path'
import type { Prisma, User } from '@prisma/client'
import { hash } from 'bcryptjs'
import type { UsersRepository } from '../../repositories/users-repository'
import { InvalidMainAreaOfActivity } from '../errors/invalid-main-area-of-activity-error'
import { UserImageStorageError } from '../errors/user-image-storage-error'
import { UserWithSameEmailOrUsernameError } from '../errors/user-with-same-email-error'
import { env } from '@/env'
import type { AcademicPublicationsRepository } from '@/repositories/academic-publications-repository'
import type { AddressRepository } from '@/repositories/address-repository'
import type { AreaOfActivityRepository } from '@/repositories/area-of-activity-repository'
import type { EnrolledCourseRepository } from '@/repositories/enrolled-course-repository'
import type { KeywordRepository } from '@/repositories/keyword-repository'
import { saveCompressedImage } from '@/services/image-storage'

interface RegisterUseCaseRequest {
  imageBuffer?: Buffer
  mainAreaActivity: string
  keywords: string[]

  user: Omit<
    Prisma.UserUncheckedCreateInput,
    'passwordHash' | 'activityAreaId' | 'profileImagePath'
  > & { password: string }

  address: Omit<Prisma.AddressUncheckedCreateInput, 'userId'>

  enrolledCourse: Omit<Prisma.EnrolledCourseUncheckedCreateInput, 'userId'>

  academicPublications: Array<
    Omit<Prisma.AcademicPublicationsUncheckedCreateInput, 'userId'>
  >
}

interface RegisterUseCaseResponse {
  user: User
}

export class RegisterUseCase {
  constructor(
    private readonly usersRepository: UsersRepository,
    private readonly addressRepository: AddressRepository,
    private readonly academicPublicationsRepository: AcademicPublicationsRepository,
    private readonly areaOfActivitiesRepository: AreaOfActivityRepository,
    private readonly enrolledCoursesRepository: EnrolledCourseRepository,
    private readonly keywordsRepository: KeywordRepository,
  ) {}

  async execute(
    registerUseCaseInput: RegisterUseCaseRequest,
  ): Promise<RegisterUseCaseResponse> {
    const existingUser = await this.usersRepository.findByEmailOrUsername([
      registerUseCaseInput.user.email,
      registerUseCaseInput.user.username,
    ])

    if (existingUser !== null) {
      throw new UserWithSameEmailOrUsernameError()
    }

    const mainAreaOfActivity = await this.areaOfActivitiesRepository.findBy({
      area: registerUseCaseInput.mainAreaActivity,
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
        return await this.keywordsRepository.findOrCreate(keyword)
      }),
    )

    const passwordHash = await hash(
      registerUseCaseInput.user.password,
      env.USER_PASSWORD_HASH_NUMBER_TIMES,
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
