import { env } from '@/env'
import type { AcademicPublicationsRepository } from '@/repositories/academic-publications-repository'
import type { AddressRepository } from '@/repositories/address-repository'
import type { AreaOfActivityRepository } from '@/repositories/area-of-activity-repository'
import type { EnrolledCourseRepository } from '@/repositories/enrolled-course-repository'
import type { KeywordRepository } from '@/repositories/keyword-repository'
import type { Prisma, User } from '@prisma/client'
import { hash } from 'bcryptjs'
import path from 'path'
import type { UsersRepository } from '../../repositories/users-repository'
import { InvalidMainAreaOfActivity } from '../errors/invalid-main-area-of-activity-error'
import { UserWithSameEmailOrUsernameError } from '../errors/user-with-same-email-error'

interface RegisterUseCaseRequest {
  mainAreaActivity: string
  keywords: string[]

  user: Omit<
    Prisma.UserUncheckedCreateInput,
    'passwordDigest' | 'activityAreaId' | 'profileImagePath'
  > & { password: string; profileImagePath: string | undefined }

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
    const existingUserByEmail = await this.usersRepository.findBy({
      email: registerUseCaseInput.user.email,
    })
    const existingUserByUsername = await this.usersRepository.findBy({
      username: registerUseCaseInput.user.username,
    })

    if (existingUserByEmail !== null || existingUserByUsername !== null) {
      throw new UserWithSameEmailOrUsernameError()
    }

    const mainAreaOfActivity = await this.areaOfActivitiesRepository.findBy({
      mainAreaActivity: registerUseCaseInput.mainAreaActivity,
    })

    if (mainAreaOfActivity === null) {
      throw new InvalidMainAreaOfActivity()
    }

    const passwordDigest = await hash(
      registerUseCaseInput.user.password,
      env.USER_PASSWORD_HASH_NUMBER_TIMES,
    )

    const keywordsCreated = await Promise.all(
      registerUseCaseInput.keywords.map(async (keyword) => {
        return await this.keywordsRepository.findOrCreate(keyword)
      }),
    )

    const user = await this.usersRepository.create(
      {
        ...registerUseCaseInput.user,
        passwordDigest,
        profileImagePath:
          registerUseCaseInput.user.profileImagePath ??
          path.resolve(
            process.cwd(),
            'uploads',
            'profile-images',
            'default-profile-pic.png',
          ),
        activityAreaId: mainAreaOfActivity.id,
      },
      keywordsCreated,
    )

    await this.addressRepository.create({
      ...registerUseCaseInput.address,
      userId: user.id,
    })

    await this.enrolledCoursesRepository.create({
      ...registerUseCaseInput.enrolledCourse,
      userId: user.id,
    })

    for (const pub of registerUseCaseInput.academicPublications) {
      await this.academicPublicationsRepository.create({
        ...pub,
        userId: user.id,
      })
    }

    return { user }
  }
}
