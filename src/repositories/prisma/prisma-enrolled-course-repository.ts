import type { Prisma } from '@prisma/client'
import { prisma } from '../../lib/prisma'
import type { EnrolledCourseRepository } from '../enrolled-course-repository'

export class PrismaEnrolledCourseRepository implements EnrolledCourseRepository {
  async create(data: Prisma.EnrolledCourseCreateInput) {
    const enrolledCourse = await prisma.enrolledCourse.create({ data })
    return enrolledCourse
  }

  async findById(id: string) {
    const enrolledCourse = await prisma.enrolledCourse.findUnique({ where: { id } })
    return enrolledCourse
  }

  async findByUserId(userId: string) {
    const enrolledCourse = await prisma.enrolledCourse.findUnique({ where: { userId } })
    return enrolledCourse
  }

  async delete(id: string) {
    await prisma.enrolledCourse.delete({ where: { id } })
  }

  async update(id: string, data: Prisma.EnrolledCourseUpdateInput) {
    const enrolledCourse = await prisma.enrolledCourse.update({ where: { id }, data })
    return enrolledCourse
  }
}
