import type { Prisma } from '@prisma/client'

type CompleteUserInformation = Prisma.UserGetPayload<{
  include: {
    address: true
    enrolledCourse: true
    activityArea: true
    academicPublications: true
    UserKeyword: {
      include: {
        keyword: true
      }
    }
  }
}>
