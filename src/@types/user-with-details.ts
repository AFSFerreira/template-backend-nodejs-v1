import { Prisma } from '@prisma/client'

export const userWithDetails = Prisma.validator<Prisma.UserDefaultArgs>()({
  include: {
    Address: true,
    EnrolledCourse: true,
    ActivityArea: true,
    AcademicPublication: {
      include: {
        AcademicPublicationAuthors: true,
      },
    },
    Keyword: true,
    DirectorBoard: true,
    Institution: true,
  },
})

export type UserWithDetails = Prisma.UserGetPayload<typeof userWithDetails>
