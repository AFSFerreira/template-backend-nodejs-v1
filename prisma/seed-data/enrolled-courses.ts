import type { Prisma } from '@prisma/generated/client'

export const enrolledCourseNestedUserData1: Prisma.EnrolledCourseCreateNestedOneWithoutUserInput = {
  create: {
    courseName: 'INTRODUÇÃO À ASTROBIOLOGIA',
    startGraduationDate: new Date(`${'2025-06'}-01T00:00:00Z`),
    expectedGraduationDate: new Date(`${'2029-06'}-01T00:00:00Z`),
    scholarshipHolder: true,
    sponsoringOrganization: 'UNIVERSIDADE LUNAR',
    supervisorName: 'NEEW ARMSTRONG',
  },
}
