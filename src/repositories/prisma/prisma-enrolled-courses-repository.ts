import { prisma } from '@lib/prisma'
import type { Prisma } from '@prisma/client'
import { injectable } from 'tsyringe'
import type { EnrolledCoursesRepository } from '../enrolled-courses-repository'

@injectable()
export class PrismaEnrolledCoursesRepository implements EnrolledCoursesRepository {
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
