import type { UpdateEnrolledCourseQuery } from '@custom-types/repository/prisma/enrolled-course/update-enrolled-course-query'
import type { DatabaseContext } from '@lib/prisma/helpers/database-context'
import { tsyringeTokens } from '@lib/tsyringe/helpers/tokens'
import type { Prisma } from '@prisma/generated/client'
import { inject, injectable } from 'tsyringe'
import type { EnrolledCoursesRepository } from '../enrolled-courses-repository'

@injectable()
export class PrismaEnrolledCoursesRepository implements EnrolledCoursesRepository {
  constructor(
    @inject(tsyringeTokens.infra.database)
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

  async update({ id, data }: UpdateEnrolledCourseQuery) {
    const enrolledCourse = await this.dbContext.client.enrolledCourse.update({
      where: { id },
      data,
    })
    return enrolledCourse
  }
}
