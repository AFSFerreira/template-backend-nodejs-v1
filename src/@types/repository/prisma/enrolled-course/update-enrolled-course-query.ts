import type { Prisma } from '@prisma/client'

export interface UpdateEnrolledCourseQuery {
  id: number
  data: Prisma.EnrolledCourseUpdateInput
}
