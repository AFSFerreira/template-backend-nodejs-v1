import { PrismaAcademicPublicationsRepository } from '@/repositories/prisma/prisma-academic-publications-repository'
import { PrismaAddressRepository } from '@/repositories/prisma/prisma-address-repository'
import { PrismaAreaOfActivityRepository } from '@/repositories/prisma/prisma-area-of-activity-repository'
import { PrismaEnrolledCourseRepository } from '@/repositories/prisma/prisma-enrolled-course-repository'
import { PrismaKeywordRepository } from '@/repositories/prisma/prisma-keyword-repository'
import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repository'
import { RegisterUseCase } from '../user/register'

export function makeRegisterUseCase() {
  const usersRepository = new PrismaUsersRepository()
  const addressRepository = new PrismaAddressRepository()
  const academicPublicationsRepository =
    new PrismaAcademicPublicationsRepository()
  const areaOfActivitiesRepository = new PrismaAreaOfActivityRepository()
  const enrolledCoursesRepository = new PrismaEnrolledCourseRepository()
  const keywordsRepository = new PrismaKeywordRepository()

  const registerUseCase = new RegisterUseCase(
    usersRepository,
    addressRepository,
    academicPublicationsRepository,
    areaOfActivitiesRepository,
    enrolledCoursesRepository,
    keywordsRepository,
  )

  return registerUseCase
}
