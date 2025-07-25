import type { EnrolledCourse } from '@prisma/client'
import type { EnrolledCourseRepository } from '@/repositories/enrolled-course-repository'

interface CreateEnrolledCourseUseCaseRequest {
  courseName?: string
  startGraduationDate?: Date
  expectedGraduationDate?: Date
  supervisorName?: string
  scholarshipHolder: boolean
  sponsoringOrganization?: string
  userId: string
}

interface CreateEnrolledCourseUseCaseResponse {
  enrolledCourse: EnrolledCourse
}

export class CreateEnrolledCourseUseCase {
  constructor(
    private readonly enrolledCourseRepository: EnrolledCourseRepository,
  ) {}

  async execute({
    courseName,
    startGraduationDate,
    expectedGraduationDate,
    supervisorName,
    scholarshipHolder,
    sponsoringOrganization,
    userId,
  }: CreateEnrolledCourseUseCaseRequest): Promise<CreateEnrolledCourseUseCaseResponse> {
    const enrolledCourse = await this.enrolledCourseRepository.create({
      courseName,
      startGraduationDate,
      expectedGraduationDate,
      supervisorName,
      scholarshipHolder,
      sponsoringOrganization,
      userId,
    })

    return { enrolledCourse }
  }
}
