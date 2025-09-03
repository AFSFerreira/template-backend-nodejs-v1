import { prisma } from '@lib/prisma/prisma'
import type { Prisma } from '@prisma/client'
import type { EnrolledCourseRepository } from '../enrolled-course-repository'

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

  async delete(id: number) {
    await prisma.enrolledCourse.delete({ where: { id } })
  }

  async update(id: number, data: Prisma.EnrolledCourseUpdateInput) {
    const enrolledCourse = await prisma.enrolledCourse.update({
      where: { id },
      data,
    })
    return enrolledCourse
  }
}
