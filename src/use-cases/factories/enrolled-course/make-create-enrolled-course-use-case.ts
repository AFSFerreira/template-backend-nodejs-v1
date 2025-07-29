import { PrismaEnrolledCourseRepository } from '@/repositories/prisma/prisma-enrolled-course-repository'
import { CreateEnrolledCourseUseCase } from '@/use-cases/enrolled-course/create-enrolled-course-use-case'

export function makeCreateEnrolledCourseUseCase() {
  const enrolledCourseRepository = new PrismaEnrolledCourseRepository()
  const createEnrolledCourseUseCase = new CreateEnrolledCourseUseCase(
    enrolledCourseRepository,
  )

  return createEnrolledCourseUseCase
}
