import type { UpdateEnrolledCourseQuery } from '@custom-types/repository/prisma/enrolled-course/update-enrolled-course-query'
import type { EnrolledCourse, Prisma } from '@prisma/generated/client'

export interface EnrolledCoursesRepository {
  create: (data: Prisma.EnrolledCourseUncheckedCreateInput) => Promise<EnrolledCourse>
  findBy: (where: Prisma.EnrolledCourseWhereInput) => Promise<EnrolledCourse | null>
  delete: (id: number) => Promise<void>
  update: (query: UpdateEnrolledCourseQuery) => Promise<EnrolledCourse>
}
