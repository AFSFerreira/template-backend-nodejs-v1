import type { EnrolledCourse, Prisma } from '@prisma/client'

export interface EnrolledCourseRepository {
  create: (
    data: Prisma.EnrolledCourseUncheckedCreateInput,
  ) => Promise<EnrolledCourse>
  findBy: (where: Prisma.EnrolledCourseWhereInput) => Promise<EnrolledCourse | null>
  delete: (id: string) => Promise<void>
  update: (
    id: string,
    data: Prisma.EnrolledCourseUpdateInput,
  ) => Promise<EnrolledCourse>
}
