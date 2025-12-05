import { Prisma } from '@prisma/client'

export const userWithDetails = Prisma.validator<Prisma.UserDefaultArgs>()({
  include: {
    EnrolledCourse: true,
    ActivityArea: true,
    SubActivityArea: true,
    Keyword: true,
    Institution: true,
    Address: {
      include: {
        State: {
          include: {
            Country: true,
          },
        },
      },
    },
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
