import type { Prisma } from '@prisma/generated/client'

export interface UpdateEnrolledCourseQuery {
  id: number
  data: Prisma.EnrolledCourseUpdateInput
}
