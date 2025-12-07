import type { DatabaseContext } from '@lib/prisma/helpers/database-context'
import { tokens } from '@lib/tsyringe/helpers/tokens'
import type { Prisma } from '@prisma/client'
import { inject, injectable } from 'tsyringe'
import type { EnrolledCoursesRepository } from '../enrolled-courses-repository'

@injectable()
export class PrismaEnrolledCoursesRepository implements EnrolledCoursesRepository {
  constructor(
    @inject(tokens.infra.database)
    private readonly dbContext: DatabaseContext,
  ) {}
  async create(data: Prisma.EnrolledCourseUncheckedCreateInput) {
    const enrolledCourse = await this.dbContext.client.enrolledCourse.create({ data })
    return enrolledCourse
  }

  async findBy(where: Prisma.EnrolledCourseWhereInput) {
    const enrolledCourse = await this.dbContext.client.enrolledCourse.findFirst({
      where,
    })
    return enrolledCourse
  }

  async delete(id: number) {
    await this.dbContext.client.enrolledCourse.delete({ where: { id } })
  }

  async update(id: number, data: Prisma.EnrolledCourseUpdateInput) {
    const enrolledCourse = await this.dbContext.client.enrolledCourse.update({
      where: { id },
      data,
    })
    return enrolledCourse
  }
}
