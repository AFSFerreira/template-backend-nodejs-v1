import type { EnrolledCourse, Prisma } from '@prisma/client'

export interface EnrolledCourseRepository {
  create: (
    data: Prisma.EnrolledCourseUncheckedCreateInput,
  ) => Promise<EnrolledCourse>
  findById: (id: string) => Promise<EnrolledCourse | null>
  findByUserId: (userId: string) => Promise<EnrolledCourse | null>
  delete: (id: string) => Promise<void>
  update: (
    id: string,
    data: Prisma.EnrolledCourseUpdateInput,
  ) => Promise<EnrolledCourse>
}
