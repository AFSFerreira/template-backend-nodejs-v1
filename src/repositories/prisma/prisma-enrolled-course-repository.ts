import type { Prisma } from '@prisma/client'
import type { EnrolledCourseRepository } from '../enrolled-course-repository'
import { prisma } from '@/lib/prisma'

export class PrismaEnrolledCourseRepository
  implements EnrolledCourseRepository
{
  async create(data: Prisma.EnrolledCourseUncheckedCreateInput) {
    const enrolledCourse = await prisma.enrolledCourse.create({ data })
    return enrolledCourse
  }

  async findBy(where: Prisma.EnrolledCourseWhereInput) {
    const enrolledCourse = await prisma.enrolledCourse.findFirst({
      where,
    })
    return enrolledCourse
  }

  async delete(id: string) {
    await prisma.enrolledCourse.delete({ where: { id } })
  }

  async update(id: string, data: Prisma.EnrolledCourseUpdateInput) {
    const enrolledCourse = await prisma.enrolledCourse.update({
      where: { id },
      data,
    })
    return enrolledCourse
  }
}
