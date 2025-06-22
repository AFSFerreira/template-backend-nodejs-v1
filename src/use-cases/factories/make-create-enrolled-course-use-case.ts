import { PrismaEnrolledCourseRepository } from '@/repositories/prisma/prisma-enrolled-course-repository'
import { CreateEnrolledCourseUseCase } from '../create-enrolled-course'

export function makeCreateEnrolledCourseUseCase() {
  const enrolledCourseRepository = new PrismaEnrolledCourseRepository()
  return new CreateEnrolledCourseUseCase(enrolledCourseRepository)
}
