import { Prisma } from '@prisma/client'

export const userWithDetails = Prisma.validator<Prisma.UserDefaultArgs>()({
  include: {
    Address: true,
    EnrolledCourse: true,
    ActivityArea: true,
    SubActivityArea: true,
    Keyword: true,
    Institution: true,
    AcademicPublication: {
      include: {
        AcademicPublicationAuthors: true,
        ActivityArea: true,
      },
    },
    DirectorBoard: {
      include: {
        DirectorPosition: true,
      },
    },
  },
})

export type UserWithDetails = Prisma.UserGetPayload<typeof userWithDetails>
