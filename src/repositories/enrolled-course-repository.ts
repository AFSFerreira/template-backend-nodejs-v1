import type { EnrolledCourse, Prisma } from '@prisma/client'

export interface EnrolledCourseRepository {
  create: (data: Prisma.EnrolledCourseUncheckedCreateInput) => Promise<EnrolledCourse>
  findBy: (where: Prisma.EnrolledCourseWhereInput) => Promise<EnrolledCourse | null>
  delete: (id: number) => Promise<void>
  update: (id: number, data: Prisma.EnrolledCourseUpdateInput) => Promise<EnrolledCourse>
}
