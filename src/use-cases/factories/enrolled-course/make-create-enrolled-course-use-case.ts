import { CreateEnrolledCourseUseCase } from '../../enrolled-course/create-enrolled-course-use-case'
import { PrismaEnrolledCourseRepository } from '@/repositories/prisma/prisma-enrolled-course-repository'

export function makeCreateEnrolledCourseUseCase() {
  const enrolledCourseRepository = new PrismaEnrolledCourseRepository()
  return new CreateEnrolledCourseUseCase(enrolledCourseRepository)
}
